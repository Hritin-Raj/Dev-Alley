import express from "express";
import { signup } from "../controller/userController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/signup", validateUser, signup);

export default router;