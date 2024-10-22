import { createContext } from "react";
import {useState, useEffect} from "react"
import {toast} from 'react-toastify'
import axios from 'axios'


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₦"; 
    const backendUrl = "https://skilllink.vercel.app"
    const [doctors, setDoctors] = useState([]);
    const [userData, setUserData] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): "")

    const getDoctorsData = async () => {
      try {
        const {data} = await axios.get(backendUrl + '/api/doctor/list')
        if (data.success) {
          setDoctors(data.doctors)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    const loadUserProfileData = async (params) => {
      try {
        const {data} = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
        if (data.success) {
          setUserData(data.userData)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }




  const value = {
    doctors,
    setDoctors,
    currencySymbol,
    backendUrl,
    token,setToken,
    userData,setUserData,
    getDoctorsData,
    loadUserProfileData
  };
  
  useEffect(()=>{
    getDoctorsData()
  },[])

  useEffect(()=>{
    if (token) {
      loadUserProfileData()
    }
    else{
      setUserData(false)
    }
  },[token])

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;


