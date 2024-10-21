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


const App = () => {
  const { aToken } = useContext(AdminContext);
 

  return aToken ?  (
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
          <Route path="/add-artisan" element ={<AddDoctor/>} />
          <Route path="/artisan-list" element ={<DoctosList/>} />


      
         
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
