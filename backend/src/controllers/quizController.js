import { checkQuiz, getDashboard } from "../services/quizServices.js";

// ================= Dashboard =================

export const dashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await getDashboard(userId);

    res.status(200).json({
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

// ================= Submit Quiz =================

export const submitQuiz = async (req, res) => {
  try {
    const {
      userId,
      level,
      questions,
      answers,
    } = req.body;

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