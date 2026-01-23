import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getGuideBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// Tourist creates booking
router.post("/", protect, createBooking);

// Guide views their bookings
router.get("/guide", protect, getGuideBookings);

export default router;
