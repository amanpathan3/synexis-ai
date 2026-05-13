const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ✅ Create app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
// ✅ Resume Upload Route
const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

// ✅ Job Fetch Route
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});