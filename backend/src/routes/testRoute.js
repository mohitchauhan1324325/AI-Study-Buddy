import express from "express";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import client from "../config/dynamoDB.js";

const router = express.Router();

const docClient = DynamoDBDocumentClient.from(client);

router.post("/save-score", async (req, res) => {
  try {
    const { userId, score } = req.body;

    await docClient.send(
      new PutCommand({
        TableName: "QuizResults",
        Item: {
          userId,
          score,
          createdAt: Date.now(),
        },
      })
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;