
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Shield, Clock, PenTool } from "lucide-react";
import {
  Scissors,
  Brush,
  Sparkles,
  Feather,
  Waves,
  Smile,
  Shirt,
  Camera,
  Hammer,
  Palette,
  Glasses,
  Utensils,
  Flower2,
 
} from "lucide-react";
import SearchBar from "./SearchBar";

const services = [
  { name: "Barbering", icon: Scissors, description: "Hair styling & grooming" },
  { name: "Makeup", icon: Brush, description: "Professional makeup services" },
  {
    name: "Nails & Lashes",
    icon: Sparkles,
    description: "Beauty enhancements",
  },
  { name: "Tattoo Art", icon: Feather, description: "Custom tattoo designs" },
  { name: "Massage", icon: Waves, description: "Therapeutic treatments" },
  { name: "Skincare", icon: Smile, description: "Facial treatments" },
  {
    name: "Fashion",
    icon: Shirt,
    description: "Custom clothing & alterations",
  },
  { name: "Photography", icon: Camera, description: "Professional shoots" },
  { name: "Carpentry", icon: Hammer, description: "Custom woodwork" },
  { name: "Art & Design", icon: Palette, description: "Custom artwork" },
  { name: "Optometry", icon: Glasses, description: "Eyewear specialist" },
  { name: "Culinary", icon: Utensils, description: "Personal chef services" },
  { name: "Florist", icon: Flower2, description: "Floral arrangements" },
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


          <SearchBar />

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
