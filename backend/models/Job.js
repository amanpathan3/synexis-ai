const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  skills: [String],
  apply_link: String,
  source: String,
  domain: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);