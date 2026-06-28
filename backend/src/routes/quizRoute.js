import express from "express";
import { dashboard, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/submit", submitQuiz);
router.get("/dashboard", dashboard);
     
export default router;