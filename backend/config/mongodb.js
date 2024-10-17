import mongoose from "mongoose"

const connectDB = async (params) => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/Allservices`)
}

export default connectDB