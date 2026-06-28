import { askAI, generateQuizAI, generateStudyPlan } from "../services/aiServices.js";

export const createStudyPlan = async (req, res) => {
  try {
    const plan = await generateStudyPlan(req.body);

    res.status(200).json({
      success: true,
      plan,
    });
    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

export const generateQuiz = async (req, res) => {
  try {
    const questions = await generateQuizAI(req.body);

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};