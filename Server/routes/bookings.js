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

  router.get("/:id", async (req, res) => {
    const bookingId = req.params.id;
  
    try {
      // Query the booking
      const conn = await dbConnection;
      const [bookingRows] = await conn.query(
        "SELECT * FROM bookings WHERE id = ?",
        [bookingId]
      );
  
      if (bookingRows.length === 0) {
        return res.status(404).json({ error: "Booking not found" });
      }
  
      const booking = bookingRows[0];
      let tour = null;
      try {
        const tourResponse = await fetch(`http://localhost:4000/api/tours/${booking.product_id}`);
        if (tourResponse.ok) {
          tour = await tourResponse.json();
        } else {
          console.error("Failed to fetch tour details:", tourResponse.statusText);
        }
      } catch (tourError) {
        console.error("Error fetching tour details:", tourError.message);
      }
  
      // Step 3: Respond with combined booking + tour
      res.json({
        ...booking,
        tour,
      });
    } catch (error) {
      console.error("Error retrieving booking:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router; 