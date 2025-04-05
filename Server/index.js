const express = require("express");
const stripe = require('stripe')('sk_test_51R7Y9AB6OLclKHp6y0Z7Zpx1TXlpJAXLPLvoeQA8DxmNqAMqqxY4U70Y8lluWHuLeA9EhtrxxCBDhUGny3EQULWE00GHjH6q2A');
const cors = require("cors");

const app = express(); // FIXED: initialize app

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // if you need to handle cookies/sessions
  }));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1R7YGYB6OLclKHp6TDVaAS0V", // Use correct price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/booking/success`,
      cancel_url: `http://localhost:3000/booking/failed`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" }); // Better error logging
  }
});

app.listen(4000, () => {
  
  console.log(`Server started at 4000`);
});
