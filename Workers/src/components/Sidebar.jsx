import React, { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            to={"/doctor-appointment"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>

          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;