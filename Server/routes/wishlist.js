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
    const conn = await dbConnection;

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

    // Handle duplicate entry error (SQL error code for duplicate = 1062)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Already in wishlist" });
    }

    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/remove", async (req, res) => {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "Missing user_id or product_id" });
  }

  try {
    const conn = await dbConnection;

    const [result] = await conn.query(
      "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    return res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "Missing user_id" });
  }

  try {
    const conn = await dbConnection;

    const [wishlist] = await conn.query(
      "SELECT product_id FROM wishlist WHERE user_id = ?",
      [user_id]
    );

    return res.status(200).json({ wishlist });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
