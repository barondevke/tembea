const express = require("express");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51R7Y9AB6OLclKHp6y0Z7Zpx1TXlpJAXLPLvoeQA8DxmNqAMqqxY4U70Y8lluWHuLeA9EhtrxxCBDhUGny3EQULWE00GHjH6q2A');
const toursRoutes = require("./routes/tours");
const userRoutes = require("./routes/user")
const wishlistRoutes = require("./routes/wishlist")
const bookingsRoutes = require("./routes/bookings")
const dbConnection = require("./db")
const app = express();
const endpointSecret = "whsec_acfafa1002acd87eb9a3926f82764caa91c3b33e5f63937839356c363e74543b"
  
app.use(cors({ origin: ["http://localhost:3001","http://localhost:3000"], credentials: true }));


app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const endpointSecret = "whsec_acfafa1002acd87eb9a3926f82764caa91c3b33e5f63937839356c363e74543b"
  
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
});

app.use(express.json());


app.use("/api/tours", toursRoutes);

app.use("/api/user", userRoutes)

app.use("/api/wishlist",wishlistRoutes)
app.use("/api/bookings",bookingsRoutes)


app.post('/create-checkout-session', async (req, res) => {
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
});


/*app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const endpointSecret = "whsec_acfafa1002acd87eb9a3926f82764caa91c3b33e5f63937839356c363e74543b"
  
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




app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
