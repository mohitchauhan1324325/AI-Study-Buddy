import express from "express";
import { fetchQuiz, postQuiz } from "../services/quizServices.js";
import { checkQuiz } from "../services/quizServices.js";
import { getDashboard } from "../services/quizServices.js";

export const dashboard = async (req, res) => {
    try {

        const { userId } = req.params;

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

export const saveQuiz = async (req, res) => {
    try {
        const data = await postQuiz(req.body);

        res.status(200).json({
            success: true,
            message: "Quiz saved successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: error.message });
    }
};

export const getQuiz = async (req, res) => {
    try {
        const { level } = req.params;
        console.log("level: ", level);

        const data = await fetchQuiz(level);

        res.status(200).json({
            success: true,
            questions: data.Items,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const submitQuiz = async (req, res) => {
    try {
        const result = await checkQuiz(req.body);

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