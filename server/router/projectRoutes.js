import express from "express";
import {
    fetchProject,
  createProject,
  toggleLike,
  fetchMostPopular,
  fetchTopPicks,
  fetchMostLiked,
  uploadProjectImage,
  updateProject,
} from "../controller/projectController.js";
import { uploadMiddleware } from "../middlewares/upload.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id", fetchProject);
router.post("/:id/create", uploadMiddleware, createProject);
router.post("/upload", upload.single("image"), uploadProjectImage);
router.put("/:id/update", updateProject);
router.get("/home/:id/top-picks", fetchTopPicks);
router.get("/home/:id/most-popular", fetchMostPopular);
router.get("/most-liked", fetchMostLiked);
router.post("/:id/like", toggleLike);

export default router;
