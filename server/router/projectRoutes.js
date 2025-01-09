import express from "express";
import { createProject, toggleLike } from "../controller/projectController.js";
import { uploadMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.post("/:id/create",uploadMiddleware, createProject);
router.get("/:id", )
router.post("/:id/like", toggleLike)
router.post("/:id/comment", )

export default router;