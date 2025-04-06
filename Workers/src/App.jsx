import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { ArtisanContext } from "./context/ArtisanContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AritsanDashboard from "./pages/ArtisanDashboard";
import ArtisanAppointment from "./pages/ArtisanAppointment";
import ArtisanProfile from "./pages/ArtisanProfile";
import ArtisanLogin from "./pages/ArtisanLogin";

const App = () => {
  const { dToken } = useContext(ArtisanContext);

  return dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Doctors Route */}
          <Route path="/dashboard" element={<AritsanDashboard />} />
          <Route path="/appointment" element={<ArtisanAppointment />} />
          <Route path="/profile" element={<ArtisanProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <ArtisanLogin />
      <ToastContainer />
    </div>
  );
};

export default App;
