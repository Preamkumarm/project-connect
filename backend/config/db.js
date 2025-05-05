import mongoose from "mongoose";

const connectDB = async()=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/connectIn");
       console.log("DB Connected Successfully");
    } catch (error) {
        console.error("Error Connected DB",error.message);
    }
}

export {connectDB};