import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArtisanContext } from "../context/ArtisanContext";

const Navbar = () => {
  const { dToken, setDToken } = useContext(ArtisanContext);

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");

    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          Artisan
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full sm:px-8"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
