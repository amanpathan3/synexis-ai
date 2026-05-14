import { useState } from "react";

import Sidebar from "../components/Sidebar";
import UploadResume from "../components/UploadResume";
import JobsSection from "../components/JobsSection";
import Home from "../components/Home";

const Dashboard = () => {

  const [activePage, setActivePage] = useState("home");

  return (

    <div className="flex bg-[#f5f7fb] min-h-screen">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">

        {activePage === "home" && <Home />}

        {activePage === "resume" && <UploadResume />}

        {activePage === "jobs" && <JobsSection />}

      </div>

    </div>
  );
};

export default Dashboard;