// import React, { useContext } from "react";
// import { DoctorContext } from "../context/DoctorContext";
// import { NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Sidebar = () => {
//   const { dToken } = useContext(DoctorContext);

//   return (
//     <div className="min-h-screen bg-white border-r">
//       {dToken && (
//         <ul className="text-[#515151] mt-5">
//           <NavLink
//             to={"/doctor-dashboard"}
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
//               }`
//             }
//           >
//             <img src={assets.home_icon} alt="" />
//             <p className="hidden md:block">Dashboard</p>
//           </NavLink>
//           <NavLink
//             to={"/doctor-appointment"}
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
//               }`
//             }
//           >
//             <img src={assets.appointment_icon} alt="" />
//             <p className="hidden md:block">Appointment</p>
//           </NavLink>

//           <NavLink
//             to={"/doctor-profile"}
//             className={({ isActive }) =>
//               `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
//                 isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""
//               }`
//             }
//           >
//             <img src={assets.people_icon} alt="" />
//             <p className="hidden md:block">Profile</p>
//           </NavLink>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


import React, { useContext, useState } from "react";
import { ArtisanContext } from "../context/ArtisanContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { dToken } = useContext(ArtisanContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    {
      path: "/dashboard",
      icon: assets.home_icon,
      label: "Dashboard"
    },
    {
      path: "/appointment",
      icon: assets.appointment_icon,
      label: "Appointment"
    },
    {
      path: "/profile",
      icon: assets.people_icon,
      label: "Profile"
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMobileMenu} 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r transform transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        w-64 lg:min-h-screen
      `}>
        {dToken && (
          <nav className="mt-16 lg:mt-5">
            <ul className="text-[#515151]">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3.5 px-4 cursor-pointer transition-colors duration-200
                      hover:bg-[#F2F3F2] 
                      ${isActive ? "bg-[#F2F3F2] border-r-4 border-primary" : ""}
                      `
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img src={item.icon} alt="" className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;