import { useEffect, useState } from "react";
import API from "../services/api";

const JobsSection = () => {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/jobs/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setJobs(res.data);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            Recommended Jobs
          </h2>

          <p className="text-zinc-400">
            Jobs based on your domain
          </p>

        </div>

      </div>

      {/* LOADING */}
      {
        loading && (
          <p className="text-zinc-400">
            Loading jobs...
          </p>
        )
      }

      {/* EMPTY */}
      {
        !loading && jobs.length === 0 && (
          <p className="text-zinc-400">
            No jobs found
          </p>
        )
      }

      {/* JOBS */}
      <div className="space-y-5 max-h-[650px] overflow-y-auto pr-2">

        {
          jobs.map((job) => (

            <div
              key={job._id}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 hover:border-emerald-500 transition-all duration-300"
            >

              {/* TITLE */}
              <h3 className="text-xl font-semibold">
                {job.title}
              </h3>

              {/* COMPANY */}
              <p className="text-emerald-400 mt-1">
                {job.company}
              </p>

              {/* LOCATION */}
              <p className="text-zinc-400 text-sm mt-1">
                {job.location}
              </p>

              {/* DOMAIN */}
              <div className="mt-3">

                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm border border-emerald-500/30">
                  {job.domain}
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="text-zinc-300 mt-4 line-clamp-4">
                {
                  job.description
                }
              </p>

              {/* APPLY BUTTON */}
              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-5 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 px-5 py-2 rounded-xl font-semibold text-black"
              >
                Apply Now
              </a>

            </div>

          ))
        }

      </div>

    </div>
  );
};

export default JobsSection;