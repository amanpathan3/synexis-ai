const axios = require("axios");
const Job = require("../models/Job");

exports.fetchJobs = async (req, res) => {
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    // 🔹 Fetch jobs
    const response = await axios.get(
      "https://arbeitnow.com/api/job-board-api"
    );

    const jobs = response.data.data;

    // 🔥 SMART FILTER (title + description + fallback)
    const keywords = domain.toLowerCase().split(" ");

    let filteredJobs = jobs.filter(job =>
      keywords.some(keyword =>
        job.title.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      )
    );

    // 🔥 FALLBACK (if nothing matched, take top jobs)
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

    res.json(savedJobs);

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};