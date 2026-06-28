import express from "express";
import { dashboard, submitQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitQuiz);
router.get("/dashboard", protect, dashboard);
     
export default router;