import client from "../config/gemini.js";

export const generateStudyPlan = async (studyData) => {
    const {
        level,
        examDate,
        studyHours,
        quizResults,
    } = studyData;

    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an expert JLPT study planner.

Create a personalized JLPT study plan.

Student Information:

Target Level: ${level}

Exam Date: ${examDate}

Daily Study Time: ${studyHours} hours

Recent Quiz Performance:
${quizResults}

Instructions:

1. Calculate the approximate number of weeks until the exam.
2. Create a week-by-week study plan.
3. Focus more on weak areas.
4. Include:
   - Vocabulary
   - Grammar
   - Kanji
   - Reading
   - Listening
   - Revision
5. Every weekend include a small mock test.
6. In the last week include only revision and mock exams.

Return the response in Markdown format.
`,
    });

    return response.text;
};

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