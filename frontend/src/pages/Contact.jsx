import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Mic,
  StopCircle,
} from "lucide-react";

const Contact = () => {
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setRecordedAudio(null);
  };
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedAudio(new Blob());
    } else {
      setIsRecording(true);
    }
  };

  return (
    <div
      className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text mb-2 sm:mb-0">
            Get in Touch
          </h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-opacity-20 backdrop-blur-lg bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="bg-white text-gray-900 dark:text-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-white mb-4 sm:mb-6">
              Contact Information
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <MapPin className="text-purple-600 dark:text-blue-900 flex-shrink-0" />
                <span>60, Osinfolarin Akoka, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <Phone className="text-purple-600 dark:text-blue-900 flex-shrink-0" />
                <span>+234 802 117 3127</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <Mail className="text-purple-600 dark:text-blue-900 flex-shrink-0" />
                <span className="break-all">contact@skillink.com</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <Clock className="text-purple-600 dark:text-blue-900 flex-shrink-0" />
                <span>Monday - Friday: 9am - 5pm</span>
              </div>
            </div>
          </div>

               {/* Interactive Map */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 transition-all duration-300 hover:shadow-2xl sm:mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white ">
              Find Us
            </h2>
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
            >
              {showMap ? "Hide Map" : "Show Map"}
            </button>
          </div>
          {showMap && (
            <div className="aspect-w-20 aspect-h-12 transition-all duration-500 ease-in-out">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.959169912679!2d3.389175373588322!3d6.526841123127393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d1d0068ae77%3A0x32a93725c868e384!2s60%20Osinfolarin%20St%2C%20Akoka%2C%20Lagos%20100223%2C%20Lagos!5e0!3m2!1sen!2sng!4v1729290276099!5m2!1sen!2sng"
                className="w-full h-full object-cover rounded-lg"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                />
              </div>
              <div>
                {!recordedAudio && (
                  <>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                    ></textarea>
                  </>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 w-full sm:w-auto border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`inline-flex items-center justify-center px-4 py-2 w-full sm:w-auto border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    isRecording
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300`}
                >
                  {isRecording ? (
                    <>
                      <StopCircle className="mr-2 h-5 w-5" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Record Message
                    </>
                  )}
                </button>
              </div>
              {recordedAudio && (
                <audio controls className="mt-4 w-full">
                  <source
                    src={URL.createObjectURL(recordedAudio)}
                    type="audio/webm"
                  />
                  Your browser does not support the audio element.
                </audio>
              )}
            </form>
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default Contact;
