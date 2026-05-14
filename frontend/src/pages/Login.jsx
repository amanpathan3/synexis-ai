import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );

      console.log(res.data);

      // 🔥 Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // 🔥 Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Login Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Login to Synexis AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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
              loading
                ? "Logging in..."
                : "Login"
            }

          </button>

        </form>

        <p className="text-zinc-400 text-center mt-6">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-emerald-400 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Login;