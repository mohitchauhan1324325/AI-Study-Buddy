import express from "express";
import { checkQuiz } from "../services/quizServices.js";
import { getDashboard } from "../services/quizServices.js";

export const dashboard = async (req, res) => {
    try {

        const userId = req.user.email;

        const result = await getDashboard(userId);

        res.json({
            success: true,
            dashboard: result,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const submitQuiz = async (req, res) => {
    try {
        const userId = req.user.email;
        const { level, questions, answers } = req.body;

        const result = await checkQuiz({
            userId,
            level,
            questions,
            answers,
        });

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};