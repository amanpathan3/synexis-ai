import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/register",
        formData
      );

      console.log(res.data);

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error.response?.data || error.message);

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Synexis AI
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Create your AI Career Account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
            />
          </div>

          {/* DOMAIN */}
          <div>
            <label className="text-sm text-zinc-300">
              Domain
            </label>

            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
            >
              <option value="">Select Domain</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="aiml">AI/ML</option>
              <option value="data science">Data Science</option>
            </select>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-zinc-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-zinc-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-emerald-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 p-3 rounded-xl font-semibold text-black"
          >
            {
              loading ? "Creating Account..." : "Register"
            }
          </button>

        </form>

        <p className="text-zinc-400 text-center mt-6">
          Already have account?{" "}

          <Link
            to="/"
            className="text-emerald-400 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;