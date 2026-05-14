import { Briefcase, Upload, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#111827] border-r border-gray-800 flex flex-col justify-between p-5">

      {/* Top */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-10">
          Synexis AI
        </h1>

        <div className="space-y-3">

          <button className="w-full flex items-center gap-3 bg-[#1f2937] hover:bg-[#374151] text-white p-3 rounded-xl transition">
            <Upload size={20} />
            Upload Resume
          </button>

          <button className="w-full flex items-center gap-3 bg-[#1f2937] hover:bg-[#374151] text-white p-3 rounded-xl transition">
            <Briefcase size={20} />
            Jobs
          </button>

        </div>
      </div>

      {/* Bottom */}
      <button className="flex items-center gap-3 text-red-400 hover:text-red-500">
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;