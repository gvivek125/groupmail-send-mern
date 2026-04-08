const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Mail = require("./models/mail");

const app = express();


// ✅ CORS (Frontend URL allow)
app.use(cors({
  origin: "https://groupmail-send-mern.vercel.app",
  methods: ["GET", "POST"],
}));

// ✅ JSON parse
app.use(express.json());


// ✅ MongoDB connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


// ✅ Root route
app.get("/", (req, res) => {
  res.send("Bulk Mail Server Running 🚀");
});


// ✅ Send Mail Route
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
    res.status(500).send("Error sending mails ❌");
  }
});


// ✅ PORT (Render compatible 🔥)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});