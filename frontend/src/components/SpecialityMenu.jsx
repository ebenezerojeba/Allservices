import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Brush, Sparkles, Feather, Waves, Smile } from "lucide-react";

const services = [
  { name: "Barbering", icon: Scissors },
  { name: "Makeup", icon: Brush },
  { name: "Nails & Lashes", icon: Sparkles },
  { name: "Tattoo Art", icon: Feather },
  { name: "Massage", icon: Waves },
  { name: "Skincare", icon: Smile },
];

const ServiceItem = ({ name, icon: Icon }) => (
  <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
    <Link
      to={`/artisans/${name.toLowerCase().replace(" & ", "-")}`}
      onClick={() => window.scrollTo(0, 0)}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <Icon size={40} className="text-blue-500 mb-4" />
      <p className="text-sm font-medium text-gray-800">{name}</p>
    </Link>
  </motion.div>
);

const SpecialityMenu = () => {
  return (
    <section className="py-20 px-4" id="services">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-center text-blue-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Book your appointment today and let our experts take care of you.
        </motion.p>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {services.map((service, index) => (
            <ServiceItem key={index} name={service.name} icon={service.icon} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
