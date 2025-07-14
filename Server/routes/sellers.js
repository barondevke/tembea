const express = require("express");
const router = express.Router();
const dbConnection = require("../db");
const nodemailer = require("nodemailer");
const requireLogin = require("../requireLogin");

const bcrypt = require("bcrypt");
require("dotenv").config();



router.get("/", async (req, res) => {
    const conn = await dbConnection;
  
    try {
      const [rows] = await conn.query("SELECT id, name FROM sellers ORDER BY name ASC");
      res.json(rows);
    } catch (err) {
      console.error("GET /api/sellers error:", err);
      res.status(500).json({ error: "Failed to retrieve sellers", details: err.message });
    }
  });
  
  module.exports = router;