import { useState } from "react";
import API from "../services/api";
import { UploadCloud } from "lucide-react";

const UploadResume = () => {

  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState([]);

  const handleUpload = async () => {

    if (!resume) {
      return alert("Please select resume");
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSkills(res.data);

      alert("Resume Uploaded Successfully");

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Resume Analysis
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Upload your resume and extract AI-powered skills
        </p>

      </div>

      {/* Upload Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

        {/* Upload Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">

          <UploadCloud
            size={40}
            className="text-blue-600"
          />

        </div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Upload Resume
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Supported format: PDF
        </p>

        {/* File Input */}
        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-200 rounded-3xl p-10 cursor-pointer hover:bg-blue-50 transition">

          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) =>
              setResume(e.target.files[0])
            }
          />

          <UploadCloud
            size={40}
            className="text-blue-500 mb-4"
          />

          <p className="text-gray-700 font-medium">
            Click to Upload Resume
          </p>

          <span className="text-sm text-gray-400 mt-2">
            PDF files only
          </span>

          {
            resume && (
              <p className="mt-4 text-blue-600 font-medium">
                {resume.name}
              </p>
            )
          }

        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white p-4 rounded-2xl font-semibold text-lg shadow-md"
        >

          {
            loading
              ? "Uploading Resume..."
              : "Upload & Extract Skills"
          }

        </button>

      </div>

      {/* Skills Section */}
      {
        skills.length > 0 && (

          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm mt-8">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Extracted Skills
            </h2>

            <div className="flex flex-wrap gap-4">

              {
                skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-5 py-3 rounded-2xl font-medium border border-blue-200"
                  >
                    {skill}
                  </span>

                ))
              }

            </div>

          </div>

        )
      }

    </div>
  );
};

export default UploadResume;