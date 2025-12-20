// src/models/guideModel.js
import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one guide profile per user
    },

    city: {
      type: String,
      required: true,
    },

    languages: {
      type: [String],
      default: [],
    },

    pricePerHour: {
      type: Number,
      required: true,
    },

    experience: {
      type: Number, // in years
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    photos: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
