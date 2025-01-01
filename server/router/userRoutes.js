import express from "express";
import { stats, suggestions, getUserById } from "../controller/userController.js";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/stats", stats);
router.get("/:id/suggestions", suggestions);
// router.put("/:id", )
// router.post("/:id/follow", )
// router.post("/:id/unfollow", )


export default router;