import express from "express";
import { chat, createStudyPlan, generateQuiz } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chat);
router.post("/study-plan", createStudyPlan);
router.post("/quiz/generate", generateQuiz);

export default router;