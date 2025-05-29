const express = require("express");
const router = express.Router();
const dbConnection = require("../db");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();



const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: "tom.ndemo.adinfinite@gmail.com",
    pass: "tbhwfuonpxrxrtha",
  },
});

function randomNumber() {
  return Math.floor(100000 + Math.random() * 900000)
}

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      access: "accepted",
    },
    APP_SECRET_KEY,
    { expiresIn: "7d" } // Token expires in 1 week
  );
};

router.post("/verify", async (req, res) => {
  const { email, name } = req.body

  try {
    const conn = await dbConnection

    // 1) Check if Email or UserName already exists
    const [rows] = await conn.query(
      "SELECT email, name FROM users WHERE email = ? OR name = ?",
      [email, name]
    )

    if ((rows).length > 0) {
      const existing = rows[0]
      const isEmail = existing.email === email
      return res.send({
        message: isEmail ? "EMAIL ALREADY IN USE" : "USERNAME ALREADY IN USE",
        proceed: false,
      })
    }

    // 2) Generate verification data
    const code = randomNumber()
    const verificationID = randomNumber()

    const mailOptions = {
      from: '"AdInfinite" <tom.ndemo.adinfinite@gmail.com>',
      to: email,
      subject: "Your verification code",
      text: `Your OTP for Tembea sign up is ${code}. Best Regards, Tembea`,
    }

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("EMAIL ERROR:", error.message)
        return res.send({
          proceed: false,
          message: "Error sending email. Try again later.",
        })
      }

      try {
        await conn.query(
          `INSERT INTO verification (id, code) VALUES (?, ?)`,
          [verificationID, code]
        )

        return res.send({
          proceed: true,
          message: "Verification code sent",
          verificationID,
        })
      } catch (dbError) {
        console.error("DB ERROR:", dbError.message)
        return res.send({
          proceed: false,
          message: "Failed to save verification code.",
        })
      }
    })
  } catch (error) {
    console.error("SERVER ERROR:", error.message)
    return res.send({
      proceed: false,
      message: "Unexpected error occurred.",
    })
  }
})

router.get("/verify-code/:verificationID/:trialCode", async (req, res) => {
  const { verificationID, trialCode } = req.params;
  try {
    const conn = await dbConnection;

    // Check verification code
    const [rows] = await conn.query(
      "SELECT * FROM Verification WHERE id = ?",
      [parseInt(verificationID)]
    );

    console.log(rows)

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
});


router.post("/sign-in", async (req, res) => {
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
});

router.get("/get-user/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  try {
    const conn = await dbConnection;

    // Query user by ID
    const [rows] = await conn.query("SELECT * FROM Users WHERE id = ?", [
      userId,
    ]);

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
      },
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.send("ERROR GETTING USER");
  }
});






module.exports = router;