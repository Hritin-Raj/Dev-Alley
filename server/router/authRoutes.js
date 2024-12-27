import express from "express";
import { signup, login } from "../controller/authController.js";

const router = express.Router();

router.post("/login", login)
router.post("/signup", signup);

export default router;