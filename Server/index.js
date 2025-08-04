require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const crypto = require("crypto");
const session = require("express-session");
const RedisStore = require("connect-redis").RedisStore;
const redisClient = require("./redisClient.js");

const toursRoutes = require("./routes/tours");
const transactionRoutes = require("./routes/transactions.js")
const userRoutes = require("./routes/user");
const wishlistRoutes = require("./routes/wishlist");
const bookingsRoutes = require("./routes/bookings");
const sellersRoutes = require("./routes/sellers")
const uploadImage = require("./routes/upload.js")
const dbConnection = require("./db");
const app = express();

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "tembea",
});

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000","https://tembezi.co.ke",         // ✅ your live frontend
    "https://www.tembezi.co.ke"],
    credentials: true,
  })
);
app.use(
  session({
    store: redisStore,
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

/*app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
const endpointSecret = "whsec_32ceab3cdb3dfb3177b4f2d5a2e1651d5adc9c664417453f18e7e2184ac7f4c3"

  
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Checkout session completed:', session);

    const conn = await dbConnection;
    try {
      const [rows] = await conn.query(
        `SELECT booking_id FROM transactions WHERE stripe_payment_id = ?`,
        [session.id]
      );

      if (rows.length > 0) {
        const bookingId = rows[0].booking_id;

        await conn.query(
          `UPDATE bookings SET status = 'Confirmed' WHERE id = ?`,
          [bookingId]
        );

        await conn.query(
          `UPDATE transactions SET payment_status = 'succeeded', updated_at = NOW() WHERE stripe_payment_id = ?`,
          [session.id]
        );

        console.log(`✅ Booking ${bookingId} confirmed.`);
      } else {
        console.log(`❌ No booking found for session ID: ${session.id}`);
      }
    } catch (error) {
      console.error('❌ Webhook database error:', error);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  response.json({ received: true });
});*/
app.post(
  "/api/paystack/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(req.body)
      .digest("hex");

    const signature = req.headers["x-paystack-signature"];

    if (hash !== signature) {
      return res.status(401).send("Invalid signature");
    }
    
    res.sendStatus(200);

    const event = JSON.parse(req.body);

    if (event.event === "charge.success") {
      const trx = event.data;

      const paymentDetails = {
        transaction_id: trx.id,
        status: trx.status,
        payment_channel: trx.channel,
        created_at: trx.created_at,
        updated_at: trx.paid_at,
        amount: trx.amount,
        currency: trx.currency,
        customer_email: trx.customer.email,
        reference: trx.reference,
      };

      console.log("✅ Payment verified:", paymentDetails);

      try {
        const conn = await dbConnection;

        // Find the booking
        const [rows] = await conn.query(
          `SELECT booking_id FROM transactions WHERE stripe_payment_id = ?`,
          [trx.reference]
        );

        if (rows.length > 0) {
          const bookingId = rows[0].booking_id;

          await conn.query(
            `UPDATE bookings SET status = 'Confirmed' WHERE id = ?`,
            [bookingId]
          );

          await conn.query(
            `UPDATE transactions SET payment_status = 'succeeded', updated_at = NOW() WHERE stripe_payment_id = ?`,
            [trx.reference]
          );

          console.log(`✅ Booking ${bookingId} confirmed.`);
        } else {
          console.log(`❌ No booking found for reference: ${trx.reference}`);
        }
      } catch (err) {
        console.error("❌ Webhook DB Error:", err);
      }
    }

  }
);

app.use(express.json());

app.use("/api/tours", toursRoutes);

app.use("/api/user", userRoutes);

app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/sellers",sellersRoutes)
app.use("/api/transactions",transactionRoutes)
app.use("/api/upload-image",uploadImage)

/*app.post('/create-checkout-session', async (req, res) => {
  const { booking_id, user_id, amount, selectedTravelers } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1R7YGYB6OLclKHp6TDVaAS0V", // Stripe price ID
          quantity: selectedTravelers,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/booking/success?bookingId=${booking_id}`,
      cancel_url: `http://localhost:3000/booking/failed`,
      metadata: {
        booking_id,
        user_id,
      },
    });

    const conn = await dbConnection;
    await conn.query(
      `INSERT INTO transactions (user_id, booking_id, stripe_payment_id, amount, currency, payment_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, booking_id, session.id, amount, 'usd', 'Pending']
    );

    res.json({ url: session.url }) // Send session ID instead of URL
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});*/

app.post("/api/initiate-payment", async (req, res) => {
  const { email, amount, subaccount, user_id, booking_id, currency } = req.body;

  if (!email || !amount || !subaccount || !user_id || !booking_id || !currency) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const finalAmount = currency === "USD" ? amount * 130 : amount;
    const paystackAmount = finalAmount * 100; // convert to kobo (Paystack's smallest unit)

    console.log("🔄 Initiating payment with:", { email, amount, finalAmount, currency, subaccount });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: paystackAmount,
        currency,
        subaccount,
        callback_url: `https://tembezi.co.ke/booking/success?bookingId=${booking_id}`,
        metadata: { booking_id, user_id },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Paystack init response:", response.data);

    const conn = await dbConnection;
    await conn.query(
      `INSERT INTO transactions (user_id, booking_id, stripe_payment_id, amount, currency, payment_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        user_id,
        booking_id,
        response.data.data.reference,
        paystackAmount,
        currency,
        "Pending",
      ]
    );

    return res.status(200).json({
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error("❌ Payment init error:", error.response?.data || error.message || error);
    return res.status(500).json({
      error: error.response?.data || error.message || "Failed to initiate payment",
    });
  }
});


app.get("/success", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Payment Successful</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f0f8ff;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
          .card {
            padding: 2rem;
            border-radius: 10px;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          .card h1 {
            color: green;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>✅ Payment Successful</h1>
          <p>Thank you for your purchase! We'll be in touch with your travel details shortly.</p>
        </div>
      </body>
    </html>
  `);
});



app.listen(4000, () => {
  console.log("Server running on https://tembezi.co.ke");
});
