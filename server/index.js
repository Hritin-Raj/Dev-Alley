import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Users from "./models/users.js";
import Projects from "./models/projects.js";
import connectMongoDB from "./models/dbConnections.js";

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




app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})