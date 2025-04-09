const express = require("express");
const cors = require("cors");
const stripe = require('stripe')('sk_test_51R7Y9AB6OLclKHp6y0Z7Zpx1TXlpJAXLPLvoeQA8DxmNqAMqqxY4U70Y8lluWHuLeA9EhtrxxCBDhUGny3EQULWE00GHjH6q2A');
const toursRoutes = require("./routes/tours");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


app.use("/api/tours", toursRoutes);


app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1R7YGYB6OLclKHp6TDVaAS0V",
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/booking/success`,
      cancel_url: `http://localhost:3000/booking/failed`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
