const axios = require("axios");
const Job = require("../models/Job");
const User = require("../models/User");

// ✅ FETCH + SAVE JOBS BASED ON USER DOMAIN
exports.fetchJobs = async (req, res) => {
  try {
    // 🔥 Get user domain
    const user = await User.findById(req.user._id);
    const domain = user.domain;

    if (!domain) {
      return res.status(400).json({ error: "User domain not set" });
    }

    // 🔹 Call API
    const response = await axios.get(
      "https://arbeitnow.com/api/job-board-api"
    );

    const jobs = response.data.data;

    const keywords = domain.toLowerCase().split(" ");

    let filteredJobs = jobs.filter(job =>
      keywords.some(keyword =>
        job.title.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      )
    );

    if (filteredJobs.length === 0) {
      filteredJobs = jobs.slice(0, 10);
    }

    const savedJobs = [];

    for (let job of filteredJobs) {

      const exists = await Job.findOne({
        title: job.title,
        company: job.company_name
      });

      if (!exists) {
        const newJob = new Job({
          title: job.title,
          company: job.company_name,
          location: job.location,
          description: job.description,
          apply_link: job.url,
          source: "arbeitnow",
          domain: domain
        });

        await newJob.save();
        savedJobs.push(newJob);
      }
    }

    res.json({
      message: "Jobs fetched & saved",
      jobs: savedJobs
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};


// ✅ GET JOBS FROM DB FOR USER
exports.getUserJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const jobs = await Job.find({ domain: user.domain })
      .sort({ createdAt: -1 });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};