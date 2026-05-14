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

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-3xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">

          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">

            <h1 className="text-2xl font-bold text-blue-600">
              S
            </h1>

          </div>

        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-3 mb-8">
          Join Synexis AI Career Platform
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

          </div>

          {/* Domain */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Domain
            </label>

            <select
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >

              <option value="">
                Select Domain
              </option>

              <option value="frontend">
                Frontend
              </option>

              <option value="backend">
                Backend
              </option>

              <option value="full stack">
                Fullstack
              </option>

              <option value="ai">
                AI/ML
              </option>

              <option value="data science">
                Data Science
              </option>

            </select>

          </div>

          {/* Email */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white p-4 rounded-2xl font-semibold text-lg shadow-md"
          >

            {
              loading
                ? "Creating Account..."
                : "Register"
            }

          </button>

        </form>

        {/* Footer */}
        <p className="text-gray-500 text-center mt-8">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;