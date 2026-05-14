import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Briefcase,
  MapPin,
  Building2,
  ExternalLink
} from "lucide-react";

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

    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Recommended Jobs
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          AI-powered jobs based on your domain
        </p>

      </div>

      {/* Loading */}
      {
        loading && (

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm text-center">

            <p className="text-gray-500 text-lg">
              Loading jobs...
            </p>

          </div>

        )
      }

      {/* Empty */}
      {
        !loading && jobs.length === 0 && (

          <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm text-center">

            <p className="text-gray-500 text-lg">
              No jobs found
            </p>

          </div>

        )
      }

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {
          jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-semibold text-gray-800 leading-tight">
                    {job.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-3 text-gray-600">

                    <Building2 size={18} />

                    <span>
                      {job.company}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">

                    <MapPin size={16} />

                    <span>
                      {job.location}
                    </span>

                  </div>

                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">

                  <Briefcase
                    size={28}
                    className="text-blue-600"
                  />

                </div>

              </div>

              {/* Domain */}
              <div className="mt-5">

                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm font-medium border border-blue-200 capitalize">
                  {job.domain}
                </span>

              </div>

              {/* Description */}
              <p
                className="text-gray-600 mt-5 leading-7 line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: job.description
                }}
              >
              </p>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-8">

                <p className="text-sm text-gray-400">
                  Source: {job.source}
                </p>

                <a
                  href={job.apply_link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-medium transition-all duration-300 shadow-md"
                >

                  Apply Now

                  <ExternalLink size={18} />

                </a>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
};

export default JobsSection;