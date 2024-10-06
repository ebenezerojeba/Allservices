import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-100">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            voluptates, sint odio dolorum eum quaerat veniam ullam quos sunt
            porro.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            quis recusandae veritatis ipsum soluta esse aspernatur asperiores!
          </p>
          <b className="text-gray-700">Lorem, ipsum dolor.</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            vero obcaecati doloribus nobis repudiandae cumque assumenda.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          Why <span className="text-gray-700 font-semibold">Choose us</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px 16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Effiecniency:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, adipisci?</p>
        </div>
        <div className="border px-10 md:px 16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, aut.</p>
        </div>
        <div className="border px-10 md:px 16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Description:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, expedita!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
