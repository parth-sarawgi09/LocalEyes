import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGuiderProfile } from "../controllers/guideController.js";

const router = express.Router();

// Create or Update Guide Profile
router.post("/profile", protect, createGuiderProfile);

export default router;
