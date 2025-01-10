import express from "express";
import { search } from "../controller/searchController.js";

const router = express.Router();

router.get("/", search);

export default router;