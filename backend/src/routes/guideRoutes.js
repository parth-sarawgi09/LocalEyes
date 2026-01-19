import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGuideProfile, getAllGuides } from "../controllers/guideController.js";

const router = express.Router();

// Create or Update Guide Profile
router.post("/profile", protect, createGuideProfile);
router.get("/", getAllGuides);

export default router;
