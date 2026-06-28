import api from "../utils/api";

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