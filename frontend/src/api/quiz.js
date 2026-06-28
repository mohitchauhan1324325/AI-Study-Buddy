import api from "../utils/api";

export const getQuiz = async (level) => {
  try {
    const res = await api.get(`/api/quiz/${level}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postQuiz = async (data) => {
  try {
    const res = await api.post("/api/quiz", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const submitQuiz = async (data) => {
  try {
    const res = await api.post("/api/submit", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboard = async () => {
  const res = await api.get("/api/dashboard");

  return res.data;
};