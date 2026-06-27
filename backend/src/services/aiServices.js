import client from "../config/openai.js";

export const askAI = async (message) => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert JLPT Japanese tutor. Explain vocabulary, grammar, kanji, and sentence structure in simple English.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
};