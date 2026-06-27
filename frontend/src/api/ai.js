import api from "../utils/api";

export const askAI = async (message) => {
  const res = await api.post("/api/ai/chat", {
    message,
  });

  return res.data;
};