import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctosList from "./pages/Admin/DoctosList";
import AllApointments from "./pages/Admin/AllApointments";
import Dashboard from "./pages/Admin/Dashboard";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctors/DoctorDashboard";
import DoctorAppointment from "./pages/Doctors/DoctorAppointment";
import DoctorProfile from "./pages/Doctors/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
        {/* Admin Routes */}
          <Route path="/" element ={<></>} />
          <Route path="/admin-dashboard" element ={<Dashboard/>} />
          <Route path="/all-appointments" element ={<AllApointments/>} />
          <Route path="/add-doctor" element ={<AddDoctor/>} />
          <Route path="/doctor-list" element ={<DoctosList/>} />


          {/* Doctors Route */}
          <Route path="/doctor-dashboard" element ={<DoctorDashboard/>} />
          <Route path="/doctor-appointment" element ={<DoctorAppointment/>} />
          <Route path="/doctor-profile" element ={<DoctorProfile/>} />
         
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
