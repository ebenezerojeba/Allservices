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
        <p className='py-5 text-sm text-center'>
          © 2024 SkillLink. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;


// import React from 'react';
// import { motion } from 'framer-motion';
// import { assets } from '../assets/assets';

// const Footer = () => {
//   const name = "Ojeba Ebenezer";
  
//   // Updated animation variants for continuous looping
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08, // delay between letters
//         repeat: Infinity, // continuous looping
//         repeatDelay: 1.5, // delay before starting again
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4, // control speed of each letter reveal
//       },
//     },
//   };

//   return (
//     <div className='px-5 md:px-10 py-10'>
//       <div className='flex flex-col lg:grid grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-14 mb-10'>
//         {/* Left Section */}
//         <div className='text-center lg:text-left'>
//           <img className='w-24 mx-auto lg:mx-0 mb-5' src={assets.logo} alt="All Services logo" />
//           <p className='text-gray-600'>
//             Connecting skilled artisans with clients in need of expert services. Find barbers, makeup artists, tattoo artists, and more, right at your fingertips.
//           </p>
//         </div>
//         {/* Center Section */}
//         <div className='text-center lg:text-left'>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='space-y-2 text-gray-600'>
//             <li><a href="/">Home</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/contact">Contact Us</a></li>
//             <li><a href="/privacy">Privacy Policy</a></li>
//           </ul>
//         </div>
//         {/* Right Section */}
//         <div className='text-center lg:text-left'>
//           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
//           <ul className='space-y-2 text-gray-600'>
//             <li>Phone: 8021173127</li>
//             <li>Email: support@allservices.com</li>
//           </ul>
//         </div>
//       </div>
//       {/* Copyright and Developer Section */}
//       <div>
//         <hr className='mb-5' />
//         <p className='text-center text-sm text-gray-600'>
//           © 2024 All Services. All Rights Reserved.
//         </p>
//         {/* Developed By Section with Continuous Animation */}
//         <motion.div
//           className='text-center text-sm mt-2 font-semibold text-indigo-600'
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <span>Developed by </span>
//           {name.split("").map((char, index) => (
//             <motion.span key={index} variants={letterVariants} className='font-bold'>
//               {char}
//             </motion.span>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default Footer;
