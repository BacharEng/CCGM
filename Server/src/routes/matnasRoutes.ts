import express from "express";
import {
  createMatnas,
  getMatnasim,
  getMatnasById,
  updateMatnasById,
  deleteMatnasById,
} from "../controllers/matnasController";

const router = express.Router();

// Create a new Matnas
router.post("/matnasim", createMatnas);

// Get all Matnasim
router.get("/matnasim", getMatnasim);

// Get a Matnas by ID
router.get("/matnasim/:id", getMatnasById);

// Update a Matnas by ID
router.put("/matnasim/:id", updateMatnasById);

// Delete a Matnas by ID
router.delete("/matnasim/:id", deleteMatnasById);

export default router;
