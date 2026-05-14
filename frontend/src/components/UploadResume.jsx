import { useState } from "react";
import API from "../services/api";

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

      console.log(res.data);

      // 🔥 Save extracted skills
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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-2">
        Upload Resume
      </h2>

      <p className="text-zinc-400 mb-6">
        Upload your PDF resume to extract skills
      </p>

      {/* FILE INPUT */}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setResume(e.target.files[0])
        }
        className="w-full bg-zinc-800 p-3 rounded-xl border border-zinc-700"
      />

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 p-3 rounded-xl font-semibold text-black"
      >

        {
          loading
            ? "Uploading..."
            : "Upload Resume"
        }

      </button>

      {/* SKILLS */}
      {
        skills.length > 0 && (

          <div className="mt-6">

            <h3 className="text-lg font-semibold mb-3">
              Extracted Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              {
                skills.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-sm border border-emerald-500/30"
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