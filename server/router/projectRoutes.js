import express from "express";
import { createProject, uploadMiddleware } from "../controller/projectController.js";

const router = express.Router();

router.post("/:id/create",uploadMiddleware, createProject);
router.get("/:id", )
router.post("/:id/like", )
router.post("/:id/comment", )

export default router;