import express from "express";
import { PutCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "../config/dynamoDB.js";
import crypto from "crypto";

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