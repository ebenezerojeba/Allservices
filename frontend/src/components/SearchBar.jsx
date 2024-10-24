import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow relative">
          <div className="flex items-center border-b border-white border-opacity-30 pb-2">
            <Search className="h-5 w-5 text-white" />
            <input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="ml-2 flex-grow bg-transparent outline-none text-white placeholder-white placeholder-opacity-70 text-lg w-full"
            />
          </div>

          {showResults && searchTerm && (
            <div className="absolute left-0 right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-xl max-h-64 overflow-y-auto z-10">
              {filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    onClick={() => {
                      setSearchTerm(service.name);
                      setShowResults(false);
                      navigate(`/artisans/${service.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`); // Navigate to the service page
                    }}
                  >
                    <service.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-gray-900 font-medium">{service.name}</div>
                      <div className="text-gray-600 text-sm">{service.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-600">No services found</div>
              )}
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <button 
            onClick={() => setShowResults(false)}
            className="w-full sm:w-auto bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center text-lg"
          >
            Find Artisan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
