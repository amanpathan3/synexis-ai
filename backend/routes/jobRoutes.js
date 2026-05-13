const express = require("express");
const router = express.Router();
const { fetchJobs } = require("../controllers/jobController");

router.get("/fetch", fetchJobs);

module.exports = router;