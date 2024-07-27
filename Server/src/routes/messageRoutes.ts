import express from "express";
import {
  createMessage,
  getMessageById,
  updateMessageById,
  deleteMessageById,
  getMessages,
} from "../controllers/messageController"; // Adjust the path as necessary

const router = express.Router();

// Create a new Message
router.post("/messages", createMessage);

// Get all Messages
router.get("/messages", getMessages);

// Get a Message by ID
router.get("/messages/:id", getMessageById);

// Update a Message by ID
router.put("/messages/:id", updateMessageById);

// Delete a Message by ID
router.delete("/messages/:id", deleteMessageById);

export default router;
