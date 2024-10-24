import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import  {assets} from '../assets/assets'
const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-4 md:mx-10 my-20">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-white/5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}/>
        </div>

        <div className="relative flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="flex-1 p-8 sm:p-10 lg:p-16 z-10">
            <div className="space-y-6">
            
              
              <div className="space-y-4">
                <h2 className="font-Ysabeau text-3xl sm:text-2xl lg:text-5xl font-bold text-gray-300">
                  Book Appointment
                  <span className="block mt-2 text-blue-100">With 50+ Trusted Workers</span>
                </h2>
                <p className="text-blue-100 text-lg max-w-lg">
                  Connect with skilled professionals and experience exceptional service tailored to your needs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => {
                    navigate('/login');
                    scrollTo(0, 0);
                  }}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-br-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create an account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-50/20 text-white font-semibold rounded-tl-full hover:bg-blue-500/30 transition-all duration-200"
                >
                  
                  <ArrowLeft className='mr-3 h-5 w-5'/>
                  <a href="#services"> Explore Services </a>
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block w-full md:w-1/2 lg:w-[420px] p-8 lg:p-12">
            <div className="relative aspect-square">
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
              
              {/* Image container with mask */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-blue-500/10 backdrop-blur-sm">
                <img
                  src={assets.bg4}
                  alt="Professional Service"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/6 bg-gradient-to-b from-blue-400/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/6 bg-gradient-to-t from-blue-400/20 to-transparent blur-3xl" />
      </div>
    </div>
  );
};

export default Banner;