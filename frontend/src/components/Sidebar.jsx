import {
  Home,
  Upload,
  Briefcase,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ activePage, setActivePage }) => {

  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="w-72 bg-white border-r border-gray-200 min-h-screen p-5 flex flex-col justify-between">

      {/* Top */}
      <div>

        <h1 className="text-3xl font-bold text-blue-600 mb-10">
          Synexis AI
        </h1>

        <div className="space-y-3">

          <button
            onClick={() => setActivePage("home")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition

              ${
                activePage === "home"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50 text-gray-700"
              }
            `}
          >
            <Home size={20} />
            Home
          </button>

          <button
            onClick={() => setActivePage("resume")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition

              ${
                activePage === "resume"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50 text-gray-700"
              }
            `}
          >
            <Upload size={20} />
            Resume
          </button>

          <button
            onClick={() => setActivePage("jobs")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl transition

              ${
                activePage === "jobs"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50 text-gray-700"
              }
            `}
          >
            <Briefcase size={20} />
            Jobs
          </button>

        </div>

      </div>

      {/* Logout */}
      <button
        onClick={logoutHandler}
        className="flex items-center gap-3 text-red-500 hover:bg-red-50 p-4 rounded-2xl transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;