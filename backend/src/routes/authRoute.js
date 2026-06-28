import express from "express";
import { saveUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/user", saveUser);

export default router;