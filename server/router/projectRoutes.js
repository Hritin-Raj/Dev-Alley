import express from "express";
import { createProject, toggleLike, fetchMostPopular, fetchTopPicks, fetchMostLiked } from "../controller/projectController.js";
import { uploadMiddleware } from "../middlewares/upload.js";

const router = express.Router();

router.post("/:id/create", uploadMiddleware, createProject);
// router.get("/:id", )
router.get("/home/:id/top-picks", fetchTopPicks);
router.get("/home/:id/most-popular", fetchMostPopular);
router.get("/most-liked", fetchMostLiked);
router.post("/:id/like", toggleLike)
// router.post("/:id/comment", )

export default router;