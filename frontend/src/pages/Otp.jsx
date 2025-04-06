import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Otp = () => {

    const [state, setState] = useState("otp");
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const {backendUrl} = useContext(AppContext);


    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            if (state === 'otp') {
                const {data} = await axios.post(backendUrl + 'api/user/send-reset-otp', {email})

                if (data.success) {
                    toast.success(data.message)
                }
                else{
                    toast.error(error.meesage)
                }
            }
            else{
                const {data} = await axios.post(backendUrl + 'api/user/reset-password', {
                    email, otp, newPassword,
                })
                if (data.success) {
                    toast.success(data.message)
                }
                else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            
        }
    }

  return (
    <form className='w-full max-h-full justify-between items-center text-center' onSubmit={onSubmitHandler} action="">
        {state === 'otp' && (
            <input placeholder='enter your otp' className='' type="tel" value={otp} onChange={(e)=> setOtp(e.target.value)} />
        )} 
        <div className=''>
            {state !== 'otp' && (
        <input placeholder='enter your email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
             )} </div>
        <div>
            {state !== 'otp' && (
        <input placeholder='enter your new password' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
             )} </div>
        
        <div>
            <button onClick={() => setState(state === 'otp' ? 'Submit' : 'Reset Password')} type='submit'>{state === 'otp' ? "submit" : "Reset Password"} </button>
        </div>
    </form>
  )
}

export default Otp