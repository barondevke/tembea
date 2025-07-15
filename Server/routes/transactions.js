const express = require("express");
const router = express.Router();
const dbConnection = require("../db");

// GET /api/transactions
router.get("/", async (req, res) => {
    try {
      const conn = await dbConnection;
      const [rows] = await conn.query(`
      SELECT 
      t.id,
      t.stripe_payment_id,
      t.amount,
      t.payment_status AS status,
      t.currency,
      t.payment_method,
      t.created_at AS date,
      b.id AS bookingId,
      u.name AS customerName
    FROM transactions t
    JOIN bookings b ON b.id = t.booking_id
    JOIN users u ON u.id = b.user_id;
    
      `);
      res.json(rows);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).json({ message: "Server error" });
    }
  });

  module.exports = router