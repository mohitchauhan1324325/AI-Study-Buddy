import express from "express";
import { user } from "../services/authServices.js";

export const saveUser = async (req, res) => {
    try {
        const data = await user(req.body);

        res.status(200).json({
            success: true,
            message: "User saved successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: error.message }); 0
    }
};