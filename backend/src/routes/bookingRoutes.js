import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getGuideBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// Tourist creates booking
router.post("/", protect, createBooking);

// Guide views their bookings
router.get("/guide", protect, getGuideBookings);

//guide accept / reject the bookings
router.patch("/:bookingId", protect, updateBookingStatus);

export default router;
