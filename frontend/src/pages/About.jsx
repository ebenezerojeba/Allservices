import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Shield, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Efficiency",
      description:
        "We streamline the process of finding skilled artisans, saving you time and effort.",
      color: "bg-blue-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Convenience",
      description:
        "With just a few clicks, you can browse through verified professionals and choose the right one for your needs.",
      color: "bg-purple-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Reliability",
      description:
        "We ensure that all artisans listed on our platform are vetted, ensuring quality and professionalism every time.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2">
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className=" font-Ysabeau text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">
          About SkillLink
        </h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
      </motion.div>

      {/* Main Content */}
      <div className="mt-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-00 to-purple-00 rounded-2xl opacity-20 blur-xl animate-pulse" />
          <img
            className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            src={assets.about_image}
            alt="About SkillLink"
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-5 text-lg text-gray-600">
            <p className="leading-relaxed">
              SkillLink is your go-to platform for connecting with skilled
              artisans and professionals. Whether you're looking for a barber,
              makeup artist, or handyman, we provide a seamless experience to
              match you with the perfect service provider.
            </p>
            <p className="leading-relaxed">
              Our mission is to create a community where quality craftsmanship
              and client satisfaction go hand-in-hand. We believe in empowering
              both artisans and clients by providing an easy, convenient way to
              connect.
            </p>
            <div className="text-xl font-semibold text-blue-600">
              Your satisfaction is our priority.
            </div>
            <p className="leading-relaxed">
              Whether you need a quick job done or a long-term service, we've
              got you covered. Our platform ensures a hassle-free experience for
              finding reliable artisans.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="mt-24">
        <motion.h2 className="text-3xl font-bold text-center mb-16" {...fadeIn}>
          Why Choose <span className="text-blue-600">SkillLink?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div
                className={`absolute top-0 left-0 h-1 w-full ${feature.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
              <div className="flex flex-col gap-4">
                <div
                  className={`${feature.color} text-white p-3 rounded-lg w-fit`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block">
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/login");
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Started Today
            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
