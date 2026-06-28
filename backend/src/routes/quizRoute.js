import express from "express";
import { dashboard, getQuiz, saveQuiz, submitQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/quiz", protect, saveQuiz);
router.get("/quiz/:level", getQuiz);
router.post("/submit", protect, submitQuiz);
router.get("/dashboard", protect, dashboard);
     
export default router;