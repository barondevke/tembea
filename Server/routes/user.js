const express = require("express");
const router = express.Router();
const dbConnection = require("../db");
const nodemailer = require("nodemailer");
const requireLogin = require("../requireLogin");

const bcrypt = require("bcrypt");
require("dotenv").config();



const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",        // Zoho SMTP server
  port: 465,                    // Secure SSL port (use 587 for TLS)
  secure: true,                 // true for port 465, false for 587
  auth: {
    user: "admin@tembezi.co.ke",  // your Zoho email address
    pass: "tembezi",    // your Zoho **app password**, not account password
  },
});

function randomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}


router.post("/verify", async (req, res) => {
  const { email, name } = req.body;

  try {
    const conn = await dbConnection;

    // 1) Check if Email or UserName already exists
    const [rows] = await conn.query(
      "SELECT email, name FROM users WHERE email = ? OR name = ?",
      [email, name]
    );

    if (rows.length > 0) {
      const existing = rows[0];
      const isEmail = existing.email === email;
      return res.send({
        message: isEmail ? "EMAIL ALREADY IN USE" : "USERNAME ALREADY IN USE",
        proceed: false,
      });
    }

    // 2) Generate verification data
    const code = randomNumber();
    const verificationID = randomNumber();

    const mailOptions = {
      from: '"Tembezi" <admin@tembezi.co.ke>',
      to: email,
      subject: "Your verification code",
      text: `Your OTP for Tembezi sign up is ${code}. Best Regards, Tembezi`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("EMAIL ERROR:", error.message);
        return res.send({
          proceed: false,
          message: "Error sending email. Try again later.",
        });
      }

      try {
        await conn.query(`INSERT INTO verification (id, code) VALUES (?, ?)`, [
          verificationID,
          code,
        ]);

        return res.send({
          proceed: true,
          message: "Verification code sent",
          verificationID,
        });
      } catch (dbError) {
        console.error("DB ERROR:", dbError.message);
        return res.send({
          proceed: false,
          message: "Failed to save verification code.",
        });
      }
    });
  } catch (error) {
    console.error("SERVER ERROR:", error.message);
    return res.send({
      proceed: false,
      message: "Unexpected error occurred.",
    });
  }
});

router.get("/verify-code/:verificationID/:trialCode", async (req, res) => {
  const { verificationID, trialCode } = req.params;
  console.log("log")
  try {
    const conn = await dbConnection;

    // Check verification code
    const [rows] = await conn.query("SELECT * FROM Verification WHERE id = ?", [
      parseInt(verificationID),
    ]);

    if (rows.length > 0 && rows[0].code == trialCode) {
      // Correct code
      res.send({ proceed: true });

      // Delete used code
      await conn.query("DELETE FROM Verification WHERE id = ?", [
        verificationID,
      ]);
    } else {
      // Wrong code
      res.send({ proceed: false });
    }
  } catch (error) {
    console.error("Verification error:", error.message);
    res.status(500).send({ proceed: false });
  }
});

router.post("/create-user", async (req, res) => {
  const data = req.body.verification;

  try {
    const conn = await dbConnection;

    const saltRounds = 12;
    const password = await bcrypt.hash(data.password, saltRounds);

    const [result] = await conn.query(
      `INSERT INTO users (name, email, password, enabled, date_created, profile_image)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [data.name, data.email, password, 1, new Date(), null]
    );

    const userId = result.insertId;

    const [users] = await conn.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const user = users[0];

    // ✅ Store session in Redis
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        date_created: user.date_created,
        enabled: user.enabled,
        profile_image: user.profile_image,
        role: user.role,
      },
      message: `USER ${user.name} CREATED AND LOGGED IN`,
      proceed: true,
    });
  } catch (error) {
    console.error("Account creation error:", error.message);
    return res.status(500).send("ERROR CREATING ACCOUNT");
  }
});

/*router.post("/create-user", async (req, res) => {
  const data = req.body.verification;


  try {
    const conn = await dbConnection;
    // Hash password
    const saltRounds = 12;
    const password = await bcrypt.hash(data.password, saltRounds);

    // Insert user
    const [result] = await conn.query(
      `INSERT INTO Users (name, email, password, enabled, date_created, profile_image)
       VALUES (?, ?, ?, ?, ?,?)`,
      [
        data.name,
        data.email,
        password,
        1,
        new Date(),
        null
      ]
    );

    const userId = result.insertId;

    // You can now fetch user to generate JWT
    const [users] = await conn.query("SELECT * FROM Users WHERE id = ?", [userId]);
    const user = users[0];

    const token = generateToken(user);

    return res.send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        date_created: user.date_created,
        enabled: user.enabled,
        profile_image: user.profile_image
      },
      message: `USER ${user.name} CREATED SUCCESFULLY`,
      proceed: true,
    });

  } catch (error) {
    console.error("Account creation error:", error.message);
    return res.status(500).send("ERROR CREATING ACCOUNT");
  }
});*/

/*router.post("/sign-in", async (req, res) => {

  const { email, password } = req.body;
  console.log(email, password)

  try {
    const conn = await dbConnection;

    // Query user by email and enabled = true
    const [rows] = await conn.query(
      "SELECT * FROM Users WHERE email = ? AND enabled = TRUE",
      [email]
    );

    if (rows.length === 0) {
      return res.send({ message: `USER NOT FOUND`, proceed: false });
    }

    const user = rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    console.log(match)
    if (!match) {
      return res.send({ message: `INCORRECT PASSWORD`, proceed: false });
    }

    // Generate JWT token
    const token = generateToken(user);

    return res.send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        enabled: user.enabled,
        date_created: user.date_created,
        profile_image: user.profile_image,
      },
      token: token,
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return res.status(500).send("ERROR SIGNING IN");
  }
});*/

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = await dbConnection;

    const [rows] = await conn.query(
      "SELECT * FROM users WHERE email = ? AND status =? AND role=?",
      [email,"active", "customer"]
    );

    console.log(rows)

    if (rows.length === 0) {
      return res.send({ message: `USER NOT FOUND`, proceed: false });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send({ message: `INCORRECT PASSWORD`, proceed: false });
    }

    // Store session in Redis
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      enabled: user.enabled,
      profile_image: user.profile_image,
      date_created: user.date_created, // ✅ include this!
      role: user.role,
    };

    console.log(req.session.user)
    await conn.query("DELETE FROM user_sessions WHERE user_id = ?", [user.id]);

    // Insert login record 
    await conn.query(
      `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES (?, ?, ?)`,
      [user.id, req.sessionID, new Date()]
    );

    res.send({
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
      user: req.session.user,
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return res.status(500).send("ERROR SIGNING IN");
  }
});

router.post("/admin/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const conn = await dbConnection;

    const [rows] = await conn.query(
      "SELECT * FROM users WHERE email = ? AND status = ? AND role=?",
      [email,"active", "admin"]
    );

    if (rows.length === 0) {
      return res.send({ message: `USER NOT FOUND`, proceed: false });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send({ message: `INCORRECT PASSWORD`, proceed: false });
    }

    // Store session in Redis
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      profile_image: user.profile_image,
      date_created: user.date_created, // ✅ include this!
      role: user.role,
    };

    await conn.query("DELETE FROM user_sessions WHERE user_id = ?", [user.id]);

    // Insert login record
    await conn.query(
      `INSERT INTO user_sessions (user_id, session_id, login_time) VALUES (?, ?, ?)`,
      [user.id, req.sessionID, new Date()]
    );

    res.send({
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
      user: req.session.user,
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return res.status(500).send("ERROR SIGNING IN");
  }
});

router.post("/sign-out", async (req, res) => {
  const sessionId = req.sessionID;
  const conn = await dbConnection;

  await conn.query(
    `UPDATE user_sessions SET logout_time = ? WHERE session_id = ?`,
    [new Date(), sessionId]
  );

  req.session.destroy((err) => {
    if (err) return res.send("FAILED TO LOG OUT");
    res.clearCookie("connect.sid");
    res.send({ message: "SIGNED OUT SUCCESSFULLY" });
  });
});

router.get("/get-user/:id", requireLogin, async (req, res) => {
  let userId = req.params.id;

  // If /get-user/0 or invalid ID, use session user ID
  const sessionUserId = req.session.user?.id;
  const requestedUserId = parseInt(userId);

  if (!sessionUserId) {
    return res.status(401).send({ message: "NOT AUTHENTICATED" });
  }

  // Use session user if 0 or NaN
  const targetId = requestedUserId === 0 || isNaN(requestedUserId)
    ? sessionUserId
    : requestedUserId;

  // Block access to other users' data
  if (targetId !== sessionUserId) {
    return res.status(403).send({ message: "FORBIDDEN: NOT YOUR PROFILE" });
  }

  try {
    const conn = await dbConnection;
    const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [targetId]);

    if (rows.length === 0) {
      return res.send({ message: `USER NOT FOUND`, proceed: false });
    }

    const user = rows[0];

    return res.send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        enabled: user.enabled,
        date_created: user.date_created,
        profile_image: user.profile_image,
        role: user.role,
      },
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(500).send("ERROR GETTING USER");
  }
});


router.get("/admin/users", async (req, res) => {
  try {
    const conn = await dbConnection;

    const [rows] = await conn.query(`
      SELECT 
        u.id, u.name, u.email, u.date_created,
        u.status,
        (SELECT MAX(login_time) FROM user_sessions WHERE user_id = u.id) AS last_login
      FROM users u
    `);

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/admin/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const conn = await dbConnection;

    // Basic info + total spent (confirmed only) + last login
    const [[user]] = await conn.query(`
      SELECT 
        u.id, u.name, u.email, u.date_created, u.status,
        (SELECT MAX(login_time) FROM user_sessions WHERE user_id = u.id) AS last_login,
        (SELECT COUNT(*) FROM bookings WHERE user_id = u.id) AS total_bookings,
        (SELECT COALESCE(SUM(price), 0) FROM bookings WHERE user_id = u.id AND status = 'Confirmed') AS total_spent
      FROM users u
      WHERE u.id = ?
    `, [userId]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Transaction history = confirmed bookings
    const [transactions] = await conn.query(`
      SELECT id, price AS amount, status, created_at
      FROM bookings
      WHERE user_id = ? AND status = 'Confirmed'
      ORDER BY created_at DESC
    `, [userId]);

    // Bookings with tour name
    const [bookings] = await conn.query(`
      SELECT 
        b.id, b.status, b.travelers, b.price, b.start_date, b.end_date,
        p.title AS tour_title
      FROM bookings b
      JOIN products p ON b.product_id = p.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [userId]);

    res.status(200).json({
      ...user,
      transactions,
      bookings
    });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/admin/users/:id/deactivate", async (req, res) => {
  const userId = req.params.id;

  try {
    const conn = await dbConnection;

    const [result] = await conn.query(
      `UPDATE users SET status = 'inactive' WHERE id = ?`,
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deactivated successfully" });
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});






module.exports = router;
