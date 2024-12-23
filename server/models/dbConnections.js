import mongoose from "mongoose";

const connectMongoDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

export default connectMongoDB;