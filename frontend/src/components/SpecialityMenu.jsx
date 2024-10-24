import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Scissors, Brush, Sparkles, Feather, Waves, Smile, 
  Shirt, Camera, Hammer, Palette, Glasses, Utensils, 
  Flower2, ChevronDown, ChevronUp
} from "lucide-react";

const services = [
  { name: "Barbering", icon: Scissors, description: "Hair styling & grooming" },
  { name: "Makeup", icon: Brush, description: "Professional makeup services" },
  { name: "Nails & Lashes", icon: Sparkles, description: "Beauty enhancements" },
  { name: "Tattoo Art", icon: Feather, description: "Custom tattoo designs" },
  { name: "Massage", icon: Waves, description: "Therapeutic treatments" },
  { name: "Skincare", icon: Smile, description: "Facial treatments" },
  { name: "Fashion", icon: Shirt, description: "Custom clothing & alterations" },
  { name: "Photography", icon: Camera, description: "Professional shoots" },
  { name: "Carpentry", icon: Hammer, description: "Custom woodwork" },
  { name: "Art & Design", icon: Palette, description: "Custom artwork" },
  { name: "Optometry", icon: Glasses, description: "Eyewear specialist" },
  { name: "Culinary", icon: Utensils, description: "Personal chef services" },
  { name: "Florist", icon: Flower2, description: "Floral arrangements" },
];

const ServiceItem = ({ name, icon: Icon, description }) => {
  const motion = typeof window !== 'undefined' ? ('framer-motion').motion : undefined;

  if (!motion) {
    return (
      <div className="h-full">
        <Link
          to={`/artisans/${name.toLowerCase().replace(" & ", "-")}`}
          onClick={() => window.scrollTo(0, 0)}
          className="flex flex-col items-center p-4 h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <Icon size={20} className="text-blue-500 mb-2" />
          <p className="text-sm font-medium text-gray-800 mb-1">{name}</p>
          <p className="text-xs text-gray-500 text-center">{description}</p>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Link
        to={`/artisans/${name.toLowerCase().replace(" & ", "-")}`}
        onClick={() => window.scrollTo(0, 0)}
        className="flex flex-col items-center p-4 h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Icon size={32} className="text-blue-500 mb-2" />
        <p className="text-sm font-medium text-gray-800 mb-1">{name}</p>
        <p className="text-xs text-gray-500 text-center">{description}</p>
      </Link>
    </motion.div>
  );
};

const SpecialityMenu = () => {
  const [showAll, setShowAll] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const motion = typeof window !== 'undefined' ? ('framer-motion') : undefined;
  
  const Container = motion?.section || "section";
  const Title = motion?.h1 || "h1";
  const Description = motion?.p || "p";
  const Grid = motion?.div || "div";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // 640px is the sm breakpoint in Tailwind
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show all services on large screens, or if showAll is true on small screens
  const visibleServices = (!isSmallScreen || showAll) ? services : services.slice(0, 4);

  return (
    <Container className="py-16 px-4" id="services">
      <div className="max-w-7xl mx-auto">
        <Title
          className="text-3xl font-bold font-Ysabeau text-center text-blue-800 mb-4"
          {...(motion && {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          })}
        >
          Explore Categories
        </Title>
        <Description
          className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
          {...(motion && {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.2 },
          })}
        >
          Connect with skilled artisans and experience exceptional craftsmanship.
        </Description>
        <Grid
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          {...(motion && {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.4 },
          })}
        >
          {visibleServices.map((service, index) => (
            <ServiceItem
              key={index}
              name={service.name}
              icon={service.icon}
              description={service.description}
            />
          ))}
        </Grid>

        {/* Show "See More" button only on small screens */}
        {isSmallScreen && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-Ysabeau inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={20} />
                </>
              ) : (
                <>
                  See More <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SpecialityMenu;