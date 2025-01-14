import express from "express";
import { storeContactDetails } from "../controller/contactController.js";

const router = express.Router();

router.post("/", storeContactDetails)

export default router;