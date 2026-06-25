import express from "express";
import { getQuiz, saveQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/quiz", saveQuiz);
router.get("/quiz/:level", getQuiz);

export default router;