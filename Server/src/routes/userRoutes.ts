import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  authenticateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/users", createUser);

// Get all users
router.get("/users", getUsers);

// Get a user by ID
router.get("/users/:id", getUserById);

// Update a user by ID
router.put("/users/:id", updateUser);

// authenticate a user
router.put("/users/authenticate/:id", authenticateUser);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

export default router;
