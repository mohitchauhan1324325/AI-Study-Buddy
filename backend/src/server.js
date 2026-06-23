import dotenv from "dotenv";
dotenv.config();

import express from "express";
import testRoute from "./routes/testRoute.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("AI Study Buddy API Running");
});

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", testRoute);

app.listen(5000, () => {
  console.log("Server running");
});