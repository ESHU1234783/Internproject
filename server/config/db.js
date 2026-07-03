import mongoose from "mongoose";

import dns from "dns";
dns.setServers(['1.1.1.1', '8.8.8.8']);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;