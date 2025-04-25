const express = require("express");
const router = express.Router();
const dbConnection = require("../db");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ndabasteve1@gmail.com",
    pass: "gchxhmvuwhgqotmu", // Use App Password if 2FA is enabled
  },
});



const JWT_SECRET = "WEBTOKEN" // Use .env in production
const TOKEN_EXPIRY = "7d"; // Token expires in 7 days

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}




function randomNumber() {
  return Math.floor(100000 + Math.random() * 900000)
}



router.post("/verifyv3", async (req, res) => {
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
      from: '"Tembea" <ndabasteve1@gmail.com>',
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
    let { verificationID, trialCode } = req.params;
    const id = parseInt(verificationID);
    console.log(id)
  
    // Add this to catch invalid inputs early
    if (isNaN(id)) {
      return res.status(400).send({ proceed: false, message: "Invalid verification ID" });
    }
  
    try {
      const conn = await dbConnection;
  
      const [rows] = await conn.query(
        "SELECT * FROM verification WHERE id = ?",
        [id]
      );
  
      if (rows.length > 0 && rows[0].code == trialCode) {
        await conn.query("DELETE FROM verification WHERE id = ?", [id]);
        res.send({ proceed: true });
      } else {
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

    // Delete verification entry by ID
    await conn.query("DELETE FROM verification WHERE id = ?", [
      req.body.VerificationID,
    ]);
    console.log("Verification code deleted");

    // Hash password
    const saltRounds = 12;
    const password = await bcrypt.hash(data.password, saltRounds);

    // Insert user
    const [result] = await conn.query(
      `INSERT INTO users (name, email, password, enabled)
       VALUES (?, ?, ?, ?)`,
      [
        data.name,
        data.email,
        password,
        1
      ]
    );

    const userId = result.insertId;

    // You can now fetch user to generate JWT
    const [users] = await conn.query("SELECT * FROM users WHERE id = ?", [userId]);
    const user = users[0];

    const token = generateToken(user);

    return res.send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        date_created: user.date_created,
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
        token: token,
        enabled: user.enabled,
        date_created: user.date_created,
      },
      message: `USER ${user.name} SIGNED IN SUCCESSFULLY`,
      proceed: true,
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return res.status(500).send("ERROR SIGNING IN");
  }
});






module.exports = router;