import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`DB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);  // Exit with failure
    }
};

export default connectDB;
