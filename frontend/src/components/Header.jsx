
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Clock, PenTool } from "lucide-react";

const services = [
  { name: "Barbering", icon: PenTool },
  { name: "Makeup", icon: PenTool },
  { name: "Nails & Lashes", icon: PenTool },
  { name: "Tattoo Art", icon: PenTool },
  { name: "Massage", icon: PenTool },
  { name: "Skincare", icon: PenTool },
];

const Header = () => {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => {
      clearInterval(serviceInterval);
    };
  }, []);

  return (
    <div className=" font-Ysabeau bg-gradient-to-br from-purple-900 to-blue-900 to-gray-00 text-white min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8">
      <nav className="py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <h2 className="text-xl font-bold">BeautiFy</h2> */}
          </motion.div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-7xl w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-Ysabeau text-3xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Connect with Skilled Artisans for your servcies
            </h1>
            <p className=" font-Ysabeau mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
              Find and book top-notch
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentService}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="font-semibold mx-2 text-blue-500"
                >
                  {services[currentService].name}
                </motion.span>
              </AnimatePresence>
              professionals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl overflow-hidden max-w-3xl w-full mx-auto"
          >
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-4">
              <div className="flex-grow flex items-center border-b border-white border-opacity-30 pb-2">
                <PenTool className="h-5 w-5 text-white" />
                <p className="ml-2 flex-grow bg-transparent outline-none text-white placeholder-white placeholder-opacity-70 text-lg">
                  Explore our services
                </p>
              </div>
              <div className="flex-shrink-0">
                 <button className="w-full sm:w-auto bg-white text-blue-400 font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center text-lg">
                  <a href="#services">Find Artisans</a>
                </button> 
             

              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex-wrap flex justify-center gap-2"
          >
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 ">
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="-sm font-Ysabeau">Verified Artisans</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Shield className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="  font-Ysabeau"> Secure Bookings</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Clock className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-Ysabeau ">24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Header;
