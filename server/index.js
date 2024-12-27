import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectMongoDB from "./models/dbConnections.js";
import authRoutes from "./router/authRoutes.js"
import userRoutes from "./router/userRoutes.js";
import projectRoutes from "./router/projectRoutes.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI

// MongoDB Connect
connectMongoDB(MONGO_URI)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);



app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})