import React from "react";
import { useContext } from "react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { DoctorContext } from "../context/DoctorContext";
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Edit3,
  Save,
  Loader,
} from "lucide-react";

const DoctorProfile = () => {
  const { profileData, dToken, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await updateProfile();
    setIsSaving(false);
    setIsEdit(false);
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative h-80 md:h-auto md:w-2/5">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              src={profileData.image}
              alt={profileData.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {profileData.name}
              </h1>
              <p className="mt-2 text-xl text-indigo-200">
                {profileData.degree}
              </p>
            </div>
          </div>
          <div className="p-6 md:p-8 md:w-3/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-indigo-500 mr-2" />
                <span className="text-xl font-semibold text-gray-800">
                  {profileData.speciality}
                </span>
              </div>
              <span className="px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                {profileData.experience}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors duration-200">
                <Mail className="h-5 w-5 mr-3" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors duration-200">
                <Phone className="h-5 w-5 mr-3" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-start text-gray-600 hover:text-indigo-500 transition-colors duration-200">
                <MapPin className="h-5 w-5 mr-3 mt-1" />
                {isEdit ? (
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                      value={profileData.address?.line1 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                      value={profileData.address?.line2 || ""}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      placeholder="Address Line 2"
                    />
                  </div>
                ) : (
                  <span>
                    {profileData.address?.line1}, {profileData.address?.line2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
          <p
            className={`text-gray-600 leading-relaxed ${
              showFullAbout ? "" : "line-clamp-3"
            }`}
          >
            {profileData.about}
          </p>
          {profileData?.about?.length > 150 && (
            <button
              className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
              onClick={() => setShowFullAbout(!showFullAbout)}
            >
              {showFullAbout ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="px-6 py-6 sm:px-8 bg-gray-50 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Calendar className="h-8 w-8 text-indigo-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Appointment Fee
              </h2>
              <div className="mt-1 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {currency}
                </span>
                {isEdit ? (
                  <input
                    type="number"
                    className="ml-2 px-3 py-1 w-28 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                    value={profileData.fee}
                  />
                ) : (
                  <span className="ml-2 text-2xl font-semibold text-gray-900">
                    {profileData.fee}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Availability
              </h2>
              <div className="mt-1 flex items-center">
                <input
                  id="available"
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md transition-colors duration-200"
                  checked={profileData.available}
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  disabled={!isEdit}
                />
                <label
                  htmlFor="available"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Available for Appointments
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8 flex justify-end bg-gray-100">
          {isEdit ? (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-3" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <Edit3 className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
