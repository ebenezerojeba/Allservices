import React, { useContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setDToken, backendUrl } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { data } = await axios.post(backendUrl + "/api/doctor/login", {
      email,
      password,
    });
    if (data.success) {
      localStorage.setItem("dToken", data.token);
      setDToken(data.token);
    } else {
      toast.error(data.message);
    }
  };
  return (
  

    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
    {/* Background Image Container */}
    <div 
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: "url('./src/assets/bg1.jpeg')", // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: ".6"

      }}
    />
    
    {/* Overlay to ensure text readability */}
    <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

    {/* Form Container */}
    <div className="relative z-10 w-full max-w-md mx-4">
      <form 
        onSubmit={onSubmitHandler}
        className="backdrop-blur-s p-6 md:p-8 rounded-2xl shadow-xl border border-white/50 w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white/65">
            <span className="text-primary">Artisan</span> Login
          </h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-md font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-00 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-md font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium
                     hover:bg-primary/90 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default DoctorLogin;
