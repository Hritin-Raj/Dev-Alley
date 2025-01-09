import express from "express";

import {
  getStats,
  getUserProjects,
  suggestions,
  getUserById,
  followUser,
  unfollowUser,
  editUser,
} from "../controller/userController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/stats", getStats);
router.get("/:id/projects", getUserProjects);
router.get("/:id/suggestions", suggestions);
router.put('/:id/edit', authenticateUser, editUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;
