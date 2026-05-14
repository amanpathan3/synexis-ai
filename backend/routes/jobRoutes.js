const express = require("express");
const router = express.Router();

const {
  fetchJobs,
  getUserJobs
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

// 🔥 Fetch from API + save
router.get("/fetch", protect, fetchJobs);

// 🔥 Get jobs from DB
router.get("/my-jobs", protect, getUserJobs);

module.exports = router;