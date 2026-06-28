import { registerUser, loginUser } from "../services/authServices.js";

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const result = await registerUser({ name, email, password });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser({ email, password });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);

        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};