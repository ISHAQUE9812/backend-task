import mongoose from "mongoose";
import  dotenv  from "dotenv";


export const connectDB = async ()=> {
    try {
        const mongoURI = process.env.MONGO_URI || "";

        if(!mongoURI) {
            throw new Error(' MONGO_URI is missing in environment variables')
        }
        await mongoose.connect(mongoURI)
        console.log("✅ MongoDB Connected Successfully")
    } catch (error) {
        console.log("❌ MongoDB Connection Failed:", error)
        process.exit(1);
    }
}