import mongoose from "mongoose";

const artisanSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    image: {type:String, required: true},
    speciality: {type:String, required: true},
    experience: {type:String, required: true},
    about: {type:String, required: true},
    available: {type:Boolean, default: true},
    fee: {type:Number, required: true},
    address:{type:Object, required: true},
    date: {type: Number, required:true},
    slots_booked: {type:Object, default:{}}
}, {minimize:false})

// const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
const artisanModel = mongoose.models.artisan || mongoose.model('doctor', artisanSchema)


export default artisanModel;