const mongoose = require("mongoose");

// Mail Schema
const mailSchema = new mongoose.Schema({
  emails: {
    type: [String],      // Array of recipient emails
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,   // Sent date
  },
});

// Export model
module.exports = mongoose.model("Mail", mailSchema);