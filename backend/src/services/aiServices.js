import client from "../config/gemini.js";

export const askAI = async (message) => {
    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are an expert JLPT Japanese tutor.
        Explain Japanese grammar, vocabulary, kanji and sentence structure in simple English.
        User Question:
        ${message}`,
    });

    return response.text;
};