import express from "express";
import {
  createUser,
  userLogin,
  getUsers,
  requestPasswordReset,
  verifyResetCode,
  getUserById,
  updateUser,
  resetPassword,
  authenticateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

// Create a new user
router.post("/users/newUser", createUser);

// login a user
router.post("/users/login", userLogin);

// request a password reset
router.post("/users/requestPasswordReset", requestPasswordReset);

// verify a user password reset request
router.post("/users/verifyResetCode", verifyResetCode);

// resetPassword
router.post("/users/resetPassword", resetPassword);

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
