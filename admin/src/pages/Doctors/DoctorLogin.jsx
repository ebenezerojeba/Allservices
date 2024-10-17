import React from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";


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
      }
      else{
        toast.error(data.message)
      }
    };
    return (
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p
            className="
      font-semibold text-2xl"
          >
            {" "}
            Admin Login
          </p>
  
          <div className="w-full">
            <p>Email:</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full">
            <p>Password:</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base"
          >
            Login
          </button>
        </div>
      </form>
    );
  };


export default DoctorLogin