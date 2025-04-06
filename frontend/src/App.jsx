import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
// import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Artisans from './pages/Artisans'
import ForgotPassword from './pages/ForgotPassword'
import Otp from './pages/Otp'
import EmailVerify from './pages/EmailVerify'

const App = ({token}) => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/artisans' element={<Artisans />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/artisans/:speciality' element={<Artisans />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/my-appointments' element={<MyAppointments />}/>
        <Route path='/appointment/:docId' element={<Appointment />}/>
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/otp' element={<Otp />}/>
        <Route path='/email-verify' element={<EmailVerify />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App