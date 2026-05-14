const cron = require("node-cron");
const axios = require("axios");
const Job = require("../models/Job");

// 🔥 Domains you support
const domains = ["frontend", "backend", "data science", "ai", "full stack"];

const fetchJobsCron = () => {

  // ⏰ Runs every 24 hours (midnight)
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏳ Running job fetch cron...");

    try {
      const response = await axios.get(
        "https://arbeitnow.com/api/job-board-api"
      );

      const jobs = response.data.data;

      for (let domain of domains) {

        const keywords = domain.toLowerCase().split(" ");

        const filteredJobs = jobs.filter(job =>
          keywords.some(keyword =>
            job.title.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword)
          )
        );

        for (let job of filteredJobs) {

          const exists = await Job.findOne({
            title: job.title,
            company: job.company_name
          });

          if (!exists) {
            await Job.create({
              title: job.title,
              company: job.company_name,
              location: job.location,
              description: job.description,
              apply_link: job.url,
              source: "arbeitnow",
              domain: domain
            });
          }
        }
      }

      console.log("✅ Jobs updated successfully");

    } catch (error) {
      console.log("❌ Cron Error:", error.message);
    }
  });
};

module.exports = fetchJobsCron;