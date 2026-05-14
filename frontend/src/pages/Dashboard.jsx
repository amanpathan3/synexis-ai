import Sidebar from "../components/Sidebar"
import UploadResume from "../components/UploadResume";
import JobsSection from "../components/JobsSection";

const Dashboard = () => {

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 bg-zinc-950 min-h-screen p-8">

        <h1 className="text-4xl font-bold mb-8">
          AI Career Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT */}
          <UploadResume />

          {/* RIGHT */}
          <JobsSection />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;