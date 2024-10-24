import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Clock,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const ArtisanRecruitment = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Briefcase,
      title: "Grow Your Business",
      description: "Access a wider customer base and expand your reach",
    },

    {
      icon: Users,
      title: "Join Community",
      description: "Connect with other professionals in your field",
    },
  ];

  return (
    <div className="mx-4 md:mx-10 my-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.1) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative px-6 py-12 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <span className="text-purple-700 text-sm font-medium">
                ✨ Join Our Platform
              </span>
            </div>
            <h2 className="text-3xl sm:text-2xl font-bold font-Ysabeau text-gray-900 mb-4">
              Become a Professional Artisan
            </h2>
            <p className="text-lg text-gray-600">
              Share your skills, grow your business, and connect with clients
              looking for quality services
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-purple-50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <benefit.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeecNrd0WDUKnGT0I8WIW_Fq4wQu3TlHtPy6YObW28QXC3Y0Q/viewform",
                  "_blank"
                );
              }}
              className="inline-flex items-center px-8 py-3.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register as Artisan
            </button>

            {/* <button
              onClick={() => {
                navigate('/about-artisans');
                scrollTo(0, 0);
              }}
              className="inline-flex items-center px-8 py-3.5 bg-purple-50 text-purple-600 font-semibold rounded-full hover:bg-purple-100 transition-all duration-200"
            >
              Learn More
              <ChevronRight className="ml-1 h-5 w-5" />
            </button> */}
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already registered? <button 
                onClick={() => {
                  window.location.href = 'https://skilllinkartisan.vercel.app'
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in to your account
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-200/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-200/30 to-transparent blur-3xl" />
      </div>
    </div>
  );
};

export default ArtisanRecruitment;
