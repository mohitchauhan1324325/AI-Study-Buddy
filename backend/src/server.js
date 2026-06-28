import dotenv from "dotenv";
dotenv.config();

import express from "express";
import quizRouter from "./routes/quizRoute.js";
import cors from "cors";
import aiRoutes from "./routes/aiRoute.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("AI Study Buddy API Running");
});

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", quizRouter);
app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running");
});