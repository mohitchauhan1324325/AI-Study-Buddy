import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    GetCommand,
    PutCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import client from "../config/dynamoDB.js";

const docClient = DynamoDBDocumentClient.from(client);

// Register User
export const registerUser = async ({ name, email, password }) => {
    // Check if user already exists
    const existingUser = await docClient.send(
        new GetCommand({
            TableName: "Users",
            Key: {
                email,
            },
        })
    );

    if (existingUser.Item) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await docClient.send(
        new PutCommand({
            TableName: "Users",
            Item: {
                email,
                name,
                password: hashedPassword,
                createdAt: Date.now(),
            },
        })
    );

    return {
        success: true,
        message: "Registration successful",
    };
};

// Login User
export const loginUser = async ({ email, password }) => {
    // Find user
    const result = await docClient.send(
        new GetCommand({
            TableName: "Users",
            Key: {
                email,
            },
        })
    );

    if (!result.Item) {
        throw new Error("Invalid Email or Password");
    }

    // Compare password
    const isMatch = await bcrypt.compare(
        password,
        result.Item.password
    );

    if (!isMatch) {
        throw new Error("Invalid Email or Password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            email: result.Item.email,
            name: result.Item.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        success: true,
        token,
        user: {
            name: result.Item.name,
            email: result.Item.email,
        },
    };
};