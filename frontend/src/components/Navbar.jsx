import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSpring, animated, config } from "react-spring";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const AnimatedNavLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverAnimation = useSpring({
    transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
    color: isHovered ? "bg-primary" : "#374151",
    config: config.wobbly,
  });

  return (
    <NavLink to={to}>
      <animated.li
        className="py-1 relative overflow-hidden"
        style={hoverAnimation}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <animated.hr
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          style={{
            transform: isHovered ? "translateX(0%)" : "translateX(-100%)",
          }}
        />
      </animated.li>
    </NavLink>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuAnimation = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu ? "translateY(0%)" : "translateY(-100%)",
    config: config.stiff,
  });

  const logoAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.wobbly,
  });

  return (
    <div className= "z-50 bg-white shadow-sm ">
      <div className="container mx-auto flex items-center justify-between text-sm py-0 px-1">
        <animated.img
          onClick={() => navigate("/")}
          className="w-[150px] cursor-pointer transform transition-transform hover:scale-105"
          src={assets.logo}
          alt="logo"
          style={logoAnimation}
        />
        
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <AnimatedNavLink to="/">HOME</AnimatedNavLink>
          <AnimatedNavLink to="/artisans">ALL ARTISANS</AnimatedNavLink>
          <AnimatedNavLink to="/about">ABOUT</AnimatedNavLink>
          <AnimatedNavLink to="/contact">CONTACT</AnimatedNavLink>
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full border-2 border-primary transition-transform transform hover:scale-110"
                src={userData.image}
                alt="profile_pic"
              />
              <img
                className="w-2.5 transition-transform transform group-hover:rotate-180"
                src={assets.dropdown_icon}
                alt="dropdown_icon"
              />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-4 p-4 transform transition-all duration-200 origin-top-right scale-95 group-hover:scale-100">
                  <p
                    onClick={() => navigate("my-profile")}
                    className="hover:text-primary cursor-pointer transition-colors"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="hover:text-primary cursor-pointer transition-colors"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-primary cursor-pointer transition-colors"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105"
            >
              Create Account
            </button>
          )}

          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer transform transition-transform hover:scale-110"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <animated.div
        style={menuAnimation}
        className="md:hidden fixed inset-0 z-50 bg-white overflow-hidden"
      >
        <div className="flex items-center justify-between py-6 px-5">
          <img className="w-36" src={assets.logo} alt="" />
          <img
            className="w-7 cursor-pointer transform transition-transform hover:scale-110"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center gap-6 mt-10 px-5 text-lg font-medium">
          <NavLink
            className="px-4 py-2 rounded inline-block transition-colors hover:text-primary"
            onClick={() => setShowMenu(false)}
            to="/"
          >
            <p>HOME</p>
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block transition-colors hover:text-primary"
            onClick={() => setShowMenu(false)}
            to="/artisans"
          >
            <p>ALL ARTISANS</p>
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block transition-colors hover:text-primary"
            onClick={() => setShowMenu(false)}
            to="/about"
          >
            <p>ABOUT</p>
          </NavLink>
          <NavLink
            className="px-4 py-2 rounded inline-block transition-colors hover:text-primary"
            onClick={() => setShowMenu(false)}
            to="contact"
          >
            <p>CONTACT</p>
          </NavLink>
        </ul>
      </animated.div>
    </div>
  );
};

export default Navbar;