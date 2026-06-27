import express from "express";
import { dashboard, getQuiz, saveQuiz, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/quiz", saveQuiz);
router.get("/quiz/:level", getQuiz);
router.post("/submit", submitQuiz);
router.get("/dashboard/:userId", dashboard);
     
export default router;