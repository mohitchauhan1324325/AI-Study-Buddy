import express from "express";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "../config/dynamoDB.js";
import crypto from "crypto";
import { Condition$ } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const docClient = DynamoDBDocumentClient.from(client);

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

    const totalQuizzes = quizzes.length;

    const highestScore =
        quizzes.length > 0
            ? Math.max(...quizzes.map((quiz) => quiz.score))
            : 0;

    const averageScore =
        quizzes.length > 0
            ? (
                  quizzes.reduce(
                      (sum, quiz) => sum + quiz.score,
                      0
                  ) / quizzes.length
              ).toFixed(2)
            : 0;

    quizzes.sort(
        (a, b) => b.submittedAt - a.submittedAt
    );

    return {
        totalQuizzes,
        highestScore,
        averageScore,
        recentQuizzes: quizzes.slice(0, 5),
    };
};

export const postQuiz = async (quizData) => {

    const {
        level,
        question,
        options,
        correctAnswer,
        explanation,
        category,
    } = quizData;

    const questionId = crypto.randomUUID();

    const command = new PutCommand({
        TableName: "QuizQuestions",
        Item: {
            level,
            questionId,
            question,
            options,
            correctAnswer,
            explanation,
            category,
            createdAt: new Date().toISOString(),
        },
    });

    return await docClient.send(command);
};

export const fetchQuiz = async (level) => {

    const command = new QueryCommand({
        TableName: "QuizQuestions",
        KeyConditionExpression: "#level = :level",
        ExpressionAttributeNames: {
            "#level": "level",
        },
        ExpressionAttributeValues: {
            ":level": level,
        },
    });
    return await docClient.send(command);
};

export const checkQuiz = async (quiz) => {
    const { userId, level, answers } = quiz;

    const result = await docClient.send(
        new QueryCommand({
            TableName: "QuizQuestions",
            KeyConditionExpression: "#level = :level",
            ExpressionAttributeNames: {
                "#level": "level",
            },
            ExpressionAttributeValues: {
                ":level": level,
            },
        })
    );

    const questions = result.Items;

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

        if (isCorrect) {
            score++;
        }

        review.push({
            questionId: question.questionId,
            question: question.question,
            options: question.options,
            userAnswer: answer.selectedAnswer,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation || "",
            isCorrect,
        });
    });

    await docClient.send(
        new PutCommand({
            TableName: "QuizResults",
            Item: {
                id: crypto.randomUUID(),
                userId,
                quizId: crypto.randomUUID(),
                level,
                score,
                totalQuestions: answers.length,
                submittedAt: Date.now(),
            },
        })
    );

    const percentage = Number(
        ((score / answers.length) * 100).toFixed(2)
    );

    return {
        score,
        totalQuestions: answers.length,
        percentage,
        correct: score,
        incorrect: answers.length - score,
        review,
    };
};
