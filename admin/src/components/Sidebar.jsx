import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full bg-white border-r transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:min-h-screen
        w-64 lg:w-72
      `}
      >
        {aToken && (
          <nav className="mt-16 md:mt-5">
            <ul className="text-[#515151]">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-colors duration-200
                  hover:bg-[#F2F3F2] hover:border-r-4 hover:border-primary
                  ${isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.home_icon} alt="" className="w-5 h-5" />
                <span className="text-sm lg:text-base">Dashboard</span>
              </NavLink>

              <NavLink
                to="/all-appointments"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-colors duration-200
                  hover:bg-[#F2F3F2] hover:border-r-4 hover:border-primary
                  ${isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
                <span className="text-sm lg:text-base">Appointment</span>
              </NavLink>

              <NavLink
                to="/add-artisan"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-colors duration-200
                  hover:bg-[#F2F3F2] hover:border-r-4 hover:border-primary
                  ${isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.add_icon} alt="" className="w-5 h-5" />
                <span className="text-sm lg:text-base">Add Artisan</span>
              </NavLink>

              <NavLink
                to="/artisan-list"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-colors duration-200
                  hover:bg-[#F2F3F2] hover:border-r-4 hover:border-primary
                  ${isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <img src={assets.people_icon} alt="" className="w-5 h-5" />
                <span className="text-sm lg:text-base">Artisan List</span>
              </NavLink>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Sidebar;
