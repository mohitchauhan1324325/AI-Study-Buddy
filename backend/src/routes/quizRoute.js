import express from "express";
import { getQuiz, saveQuiz, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/quiz", saveQuiz);
router.get("/quiz/:level", getQuiz);
router.post("/submit", submitQuiz);
     
export default router;