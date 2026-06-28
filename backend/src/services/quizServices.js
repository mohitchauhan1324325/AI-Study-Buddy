import {
    PutCommand,
    ScanCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import client from "../config/dynamoDB.js";
import crypto from "crypto";

const docClient = DynamoDBDocumentClient.from(client);

// ================= Dashboard =================

export const getDashboard = async (userId) => {
    const result = await docClient.send(
        new ScanCommand({
            TableName: "QuizResults",
            FilterExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": userId,
            },
        })
    );

    const quizzes = result.Items || [];

    quizzes.sort(
        (a, b) => Number(b.submittedAt) - Number(a.submittedAt)
    );

    const totalQuizzes = quizzes.length;

    const highestScore =
        quizzes.length > 0
            ? Math.max(...quizzes.map((quiz) => quiz.score))
            : 0;

    const averageScore =
        quizzes.length > 0
            ? Number(
                (
                    quizzes.reduce((sum, quiz) => sum + quiz.score, 0) /
                    quizzes.length
                ).toFixed(2)
            )
            : 0;

    return {
        totalQuizzes,
        highestScore,
        averageScore,
        recentQuizzes: quizzes.slice(0, 5),
    };
};

// ================= Submit Quiz =================

export const checkQuiz = async ({
    userId,
    level,
    questions,
    answers,
}) => {
    const questionMap = {};

    questions.forEach((question) => {
        questionMap[question.questionId] = question;
    });

    let score = 0;
    const review = [];

    answers.forEach((answer) => {
        const question = questionMap[answer.questionId];

        if (!question) return;

        const isCorrect =
            question.correctAnswer === answer.selectedAnswer;

        if (isCorrect) score++;

        review.push({
            questionId: question.questionId,
            question: question.question,
            options: question.options,
            userAnswer: answer.selectedAnswer,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            isCorrect,
        });
    });

    await docClient.send(
        new PutCommand({
            TableName: "QuizResults",
            Item: {
                id: crypto.randomUUID(),
                quizId: crypto.randomUUID(),
                userId,
                level,
                score,
                totalQuestions: questions.length,
                submittedAt: Date.now(),
            },
        })
    );

    const totalQuestions = questions.length;

    return {
        score,
        totalQuestions,
        percentage: Number(
            ((score / totalQuestions) * 100).toFixed(2)
        ),
        correct: score,
        incorrect: totalQuestions - score,
        review,
    };
};