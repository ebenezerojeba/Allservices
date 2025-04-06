
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { motion } from "framer-motion";
import { Edit, Save, Upload, X } from "lucide-react"; // Lucide Icons

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + 'api/user/send-verify-otp')

      if (data.success) {
        navigate('email-verify')
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    userData && (
      <motion.div
        className="max-w-lg flex flex-col gap-2 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isEdit ? (
          <label htmlFor="image">
            <motion.div
              className="inline-block relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="profile"
              />
              <motion.div
                className="absolute bottom-12 right-12 bg-white p-2 rounded-full"
                whileTap={{ scale: 0.9 }}
              >
                <Upload className="w-6 h-6 text-primary" />
              </motion.div>
            </motion.div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="profile" />
        )}

        {isEdit ? (
          <motion.input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 border-b-2 border-primary focus:outline-none"
            value={userData.name}
            type="text"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-50 h-[1px] border-none my-3" />

        <div>
          <p className="text-neutral-500 underline">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">
              {userData.email} {' '} <br />
              <span className="text-primary cursor-pointer" onClick={sendVerificationOtp}>Verify email</span>

            </p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <motion.input
                className="bg-gray-100 max-w-52 border-b-2 border-primary"
                value={userData.phone}
                type="tel"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                whileFocus={{ scale: 1.02 }}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <motion.input
                  className="bg-gray-50 mb-2"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                />
                <motion.input
                  className="bg-gray-50"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] text-neutral-700 gap-y-2.5">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <motion.select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </motion.select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <motion.input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <motion.button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
              onClick={updateUserProfileData}
              whileHover={{ scale: 1.05 }}
            >
              <Save className="w-4 h-4" />
              Save
            </motion.button>
          ) : (
            <motion.button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
              onClick={() => setIsEdit(true)}
              whileHover={{ scale: 1.05 }}
            >
              <Edit className="w-4 h-4" />
              Edit
            </motion.button>
          )}
        </div>
      </motion.div>
    )
  );
};

export default MyProfile;
