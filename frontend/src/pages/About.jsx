import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-blue-600">
        <p>
          ABOUT <span className="text-blue-600 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
         SkillLink is your go-to platform for connecting with skilled
            artisans and professionals. Whether you're looking for a barber,
            makeup artist, or handyman, we provide a seamless experience to
            match you with the perfect service provider.
          </p>
          <p>
            Our mission is to create a community where quality craftsmanship and
            client satisfaction go hand-in-hand. We believe in empowering both
            artisans and clients by providing an easy, convenient way to
            connect.
          </p>
          <b className="text-gray-700">Your satisfaction is our priority.</b>
          <p>
            Whether you need a quick job done or a long-term service, we've got
            you covered. Our platform ensures a hassle-free experience for
            finding reliable artisans.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          Why <span className="text-gray-700 font-semibold">Choose Us?</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            We streamline the process of finding skilled artisans, saving you
            time and effort.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>
            With just a few clicks, you can browse through verified
            professionals and choose the right one for your needs.
          </p>
        </div>
        <div className="border px-10 md:px-16 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Reliability:</b>
          <p>
            We ensure that all artisans listed on our platform are vetted,
            ensuring quality and professionalism every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
