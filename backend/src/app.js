import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/guides", guideRoutes);


export default app;