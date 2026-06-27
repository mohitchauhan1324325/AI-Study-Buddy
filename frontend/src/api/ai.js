import api from "../utils/api";

export const askAI = async (message) => {
  const res = await api.post("/api/ai/chat", {
    message,
  });

  return res.data;
};

export const generateStudyPlan = async (data) => {
  try {
    const res = await api.post("/api/ai/study-plan", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};