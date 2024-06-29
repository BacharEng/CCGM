import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  birthDate: Date,
  isAuthenticated: { type: Boolean, default: false },
  isInstructor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
