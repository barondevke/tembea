// routes/wishlist.js or within your main Express file

const express = require("express");
const router = express.Router();
const dbConnection = require("../db"); // your db connection file

// POST /api/wishlist/add
router.post("/add", async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "Missing user_id or product_id" });
  }

  try {
    const conn = await dbConnection
    const [existing] = await conn.query(
      "SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    // Insert into wishlist
    const [result] = await conn.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
      [user_id, product_id]
    );

    return res.status(201).json({
      message: "Added to wishlist",
      wishlist_id: result.insertId,
    });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
