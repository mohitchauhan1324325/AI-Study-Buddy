import express from "express";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "../config/dynamoDB.js";
import crypto from "crypto";

const docClient = DynamoDBDocumentClient.from(client);

export const user = async (userData) => {
    const { userId, name, email, jlptLevel } = userData;

    const command = new PutCommand({
        TableName: "Users",
        Item: {
            id: crypto.randomUUID(),
            userId,
            name,
            email,
            jlptLevel,
            createdAt: new Date().toISOString(),
        },
    });

    return await docClient.send(command);
};