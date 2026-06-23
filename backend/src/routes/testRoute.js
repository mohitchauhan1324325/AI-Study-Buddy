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
        TableName: "Users",
        Item: {
          id: crypto.randomUUID(),
          userId,
          score,
          createdAt: Date.now(),
        },
      })
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;