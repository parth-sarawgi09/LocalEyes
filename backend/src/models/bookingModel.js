import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    durationHours: {
      type: Number,
      required: true,
      min: 1,
    },

    meetingLocation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
