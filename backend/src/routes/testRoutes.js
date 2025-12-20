import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "LocalEyes backend is running smoothly 🚀" });
});

export default router;