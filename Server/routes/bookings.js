const express = require("express");
const router = express.Router();
const dbConnection = require("../db");

router.post("/create", async (req, res) => {
    const { user_id, product_id, start_date, end_date, travelers, price } = req.body;
  
    if (!user_id || !product_id || !start_date || !end_date || !travelers || !price) {
      return res.status(400).json({ message: "Missing required booking data" });
    }
  
    try {
      const conn = await dbConnection;
  
      const [result] = await conn.query(
        `INSERT INTO bookings (user_id, product_id, start_date, end_date, travelers, price, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [user_id, product_id, start_date, end_date, travelers, price, "Pending"]
      );
  
      return res.status(201).json({
        message: "Booking created successfully",
        booking_id: result.insertId,
      });
    } catch (err) {
      console.error("Error creating booking:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });
  
module.exports = router; 