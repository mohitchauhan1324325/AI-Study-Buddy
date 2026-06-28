import express from "express";
import { dashboard, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/submit", submitQuiz);
router.get("/dashboard/:userId", dashboard);

export default router;