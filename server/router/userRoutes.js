import express from "express";
// import {body} from "express-validator";

import {
  getStats,
  suggestions,
  getUserById,
  followUser,
  unfollowUser,
  editUser,
} from "../controller/userController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
// import { editUser } from '../controllers/userController.js';

const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/stats", getStats);
router.get("/:id/suggestions", suggestions);
// routes/users.js
router.put('/:id/edit', authenticateUser, editUser);
// router.put(
//   "/:id/edit",
//   authenticateUser,
//   [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("bio").optional().isString(),
//     body("location").optional().isString(),
//     body("skills").optional().isArray(),
//     body("links.github").optional().isURL().withMessage("Invalid GitHub URL"),
//     body("links.linkedIn")
//       .optional()
//       .isURL()
//       .withMessage("Invalid LinkedIn URL"),
//     body("links.instagram")
//       .optional()
//       .isURL()
//       .withMessage("Invalid Instagram URL"),
//     body("links.portfolio")
//       .optional()
//       .isURL()
//       .withMessage("Invalid Portfolio URL"),
//   ],
//   editUser
// );
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;
