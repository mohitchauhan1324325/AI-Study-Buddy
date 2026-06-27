import OpenAI from "openai";

console.log("OPENAI KEY:", process.env.OPENAI_API_KEY?.slice(0, 10));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default client;