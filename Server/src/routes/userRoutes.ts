import express from "express";
import {
  createUser,
  userLogin,
  getUsers,
  getUserById,
  updateUser,
  resetPassword,
  authenticateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/users", createUser);

// login a user
router.post("/users/login", userLogin);

// Get all users
router.get("/users", getUsers);

// Get a user by ID
router.get("/users/:id", getUserById);

// Update a user by ID
router.put("/users/:id", updateUser);

// authenticate a user
router.put("/users/authenticate/:id", authenticateUser);

// resetPassword
router.put("/users/resetPassword", resetPassword);

// Delete a user by ID
router.delete("/users/:id", deleteUser);

export default router;
