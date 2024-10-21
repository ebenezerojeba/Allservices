import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      {/* Adjusted the margin-top to mt-10 from mt-40 */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_3fr] gap-5 my-10 mt-10 text-sm'>
        {/* Left Section */}
        {/* <div>
          <img className='w-[80px] mt-2' src={assets.logo} alt="All Services logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Connecting skilled artisans with clients in need of expert services. Find barbers, makeup artists, tattoo artists, and more, right at your fingertips.
          </p>
        </div> */}
        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Phone: 8021173127</li>
            <li>Email: support@skilllink.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div>
  <hr />
  <p className="py-5 text-sm text-center">
    © 2024 SkillLink. All Rights Reserved.
  </p>
  
  <p className="text-xs text-center text-gray-700">
    Developed by 
    <a 
      href="https://ebenezerojeba.vercel.app" 
      target="_blank" 
      rel="noopener noreferrer"
      className="font-semibold text-blue-500 hover:text-blue-800"
    >
      {" "}Ojeba Ebenezer
    </a>
  </p>
</div>

    </div>
  );
}

export default Footer;

