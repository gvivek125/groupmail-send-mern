const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Mail = require("./models/mail");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Bulk Mail Server Running");
});

// Single /send-mails route
app.post("/send-mails", async (req, res) => {
  const { emails, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    // Save mail to DB
    await Mail.create({ emails, subject, message });

    // Send mails
    for (let email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: message,
      });
    }

    res.send("Emails sent and saved successfully ✅");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending mails");
  }
});

// Server listen
app.listen(5000, () => {
  console.log("Server running on port 5000");
});