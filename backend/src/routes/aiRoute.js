import express from "express";
import { chat, createStudyPlan } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chat);
router.post("/study-plan", createStudyPlan);

export default router;