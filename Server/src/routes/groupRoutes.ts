import express from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
} from "../controllers/groupController";

const router = express.Router();

// Create a new Group
router.post("/groups", createGroup);

// Get all groups
router.get("/groups", getGroups);

// Get a Group by ID
router.get("/groups/:id", getGroupById);

// Update a Group by ID
router.put("/groups/:id", updateGroupById);

// Delete a Group by ID
router.delete("/groups/:id", deleteGroupById);

export default router;
