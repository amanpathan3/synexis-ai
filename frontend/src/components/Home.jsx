import { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

    }
  };

  useEffect(() => {

    fetchUser();

  }, []);

  return (

    <div>

      {/* Welcome */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Your AI Career Intelligence Dashboard
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* Domain */}
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">

          <h2 className="text-blue-700 text-xl font-semibold">
            Domain
          </h2>

          <p className="mt-3 text-gray-700 capitalize text-lg">
            {user?.domain}
          </p>

        </div>

        {/* Skills */}
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">

          <h2 className="text-blue-700 text-xl font-semibold">
            Skills
          </h2>

          <p className="mt-3 text-gray-700 text-lg">
            {user?.skills?.length || 0} Skills
          </p>

        </div>

        {/* Status */}
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">

          <h2 className="text-blue-700 text-xl font-semibold">
            Career Status
          </h2>

          <p className="mt-3 text-gray-700 text-lg">
            Active
          </p>

        </div>

      </div>

    </div>
  );
};

export default Home;