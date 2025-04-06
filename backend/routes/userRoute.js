import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentFlutterWave, logoutUser, sendVerifyOtp, verifyEmail, isAunthenticated, sendResetOtp, resetPassword, getUserData } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.post('/send-verify-otp', authUser, sendVerifyOtp)
userRouter.post('/verify-account',authUser, verifyEmail)
userRouter.post('/is-auth',authUser, isAunthenticated)
userRouter.post('/send-reset-otp', sendResetOtp)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/get-data',authUser,getUserData)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/payment-flutterwave',authUser,paymentFlutterWave)


export default userRouter