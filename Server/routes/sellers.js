const express = require("express");
const router = express.Router();
const dbConnection = require("../db");
const nodemailer = require("nodemailer");
const requireLogin = require("../requireLogin");

const bcrypt = require("bcrypt");
require("dotenv").config();



router.get("/", async (req, res) => {
  try {
    const conn = await dbConnection;

    const [sellers] = await conn.query(`
      SELECT 
        s.id, 
        s.name, 
        s.subaccount_code,
        s.enabled,
        COUNT(p.id) AS totalProducts
      FROM sellers s
      LEFT JOIN products p ON p.seller_id = s.id
      GROUP BY s.id
      ORDER BY s.id DESC
    `);

    res.status(200).json(sellers);
  } catch (err) {
    console.error("Error fetching sellers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

  router.post("/", async (req, res) => {
    const { name, subaccount_code, enabled = true } = req.body;
  
    if (!name || !subaccount_code) {
      return res.status(400).json({ message: "Name and subaccount_code are required" });
    }
  
    try {
      const conn = await dbConnection;
  
      const [existing] = await conn.query(
        "SELECT id FROM sellers WHERE subaccount_code = ?",
        [subaccount_code]
      );
  
      if (existing.length > 0) {
        return res.status(409).json({ message: "Subaccount code already exists" });
      }
  
      const [result] = await conn.query(
        `INSERT INTO sellers (name, subaccount_code, enabled) VALUES (?, ?, ?)`,
        [name, subaccount_code, enabled]
      );
  
      res.status(201).json({
        message: "Seller created",
        sellerId: result.insertId,
      });
    } catch (err) {
      console.error("Error adding seller:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
  
  module.exports = router;