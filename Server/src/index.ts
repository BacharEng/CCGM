import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import matnasRoutes from "./routes/matnasRoutes";
import groupRoutes from "./routes/groupRoutes";
import messageRoutes from "./routes/messageRoutes";

dotenv.config();

const app = express();

// Configure CORS with options for more security
const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your front-end URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());

// Check if the MongoDB URL is set
if (!process.env.MONGO_URL) {
  console.error("Mongo URL is not set");
  process.exit(1);
}

app.use("/api", userRoutes);
app.use("/api", matnasRoutes);
app.use("/api", groupRoutes);
app.use("/api", messageRoutes);

// Set up MongoDB connection options
const mongoOptions = {
  dbName: "CCGM",
};

// Improved MongoDB connection with error handling
mongoose
  .connect(process.env.MONGO_URL, mongoOptions)
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
