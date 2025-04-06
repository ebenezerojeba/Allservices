import { createContext } from "react";
import {useState, useEffect} from "react"
import {toast} from 'react-toastify'
import axios from 'axios'


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₦"; 
    // const backendUrl = "https://skilllink.vercel.app"
    // const backendUrl = "https://skillinkbackend.onrender.com"
    const backendUrl = "http://localhost:4000";
    const [artisans, setArtisans] = useState([]);
    const [userData, setUserData] = useState(false)
    const [isLoggedIn, setIsLoggedin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): "")


    const getArtisansData = async () => {
      try {
        const {data} = await axios.get(backendUrl + '/api/artisan/list')
        if (data.success) {
          setArtisans(data.artisans)
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
    artisans,
    setArtisans,
    currencySymbol,
    backendUrl,
    token,setToken,
    userData,setUserData,
    getArtisansData,
    loadUserProfileData, 
    isLoggedIn,
    setIsLoggedin
  };
  
  useEffect(()=>{
    getArtisansData()
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


