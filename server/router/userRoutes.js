import express from "express";

import {
  getStats,
  getUserProjects,
  suggestions,
  getUserById,
  followUser,
  unfollowUser,
  editUser,
  uploadProjectImage,
  fetchTopUsers,
} from "../controller/userController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/stats", getStats);
router.get("/:id/projects", getUserProjects);
router.get("/:id/top-users", fetchTopUsers);
router.post("/upload", upload.single("image"), uploadProjectImage);
router.get("/:id/suggestions", suggestions);
router.put('/:id/edit', authenticateUser, editUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;
