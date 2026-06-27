import { askAI } from "../services/aiServices.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await askAI(message);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};