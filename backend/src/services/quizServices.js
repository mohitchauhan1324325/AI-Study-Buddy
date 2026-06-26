import express from "express";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "../config/dynamoDB.js";
import crypto from "crypto";
import { Condition$ } from "@aws-sdk/client-dynamodb";

const docClient = DynamoDBDocumentClient.from(client);

export const postQuiz = async (quizData) => {

    const {
        level,
        question,
        options,
        correctAnswer,
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

    answers.forEach((answer) => {
        const question = questionMap[answer.questionId];

        if (question && question.correctAnswer === answer.selectedAnswer) {
            score++;
        }
    });

    await docClient.send(
        new PutCommand({
            TableName: "QuizResults",
            Item: {
                userId,
                quizId: crypto.randomUUID(),
                level,
                score,
                totalQuestions: answers.length,
                submittedAt: Date.now(),
            },
        })
    );

    return {
        score,
        totalQuestions: answers.length,
        percentage: Number(((score / answers.length) * 100).toFixed(2)),
    };

};

