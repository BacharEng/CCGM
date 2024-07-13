import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: Date;
  birthDate: Date;
  authenticationToken: Number;
  isAuthenticated: boolean;
  isInstructor: boolean;
  isAdmin: boolean;
  isModified(path: string): boolean;
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  birthDate: { type: Date, required: true },
  authenticationToken: { type: Number, required: true },
  isAuthenticated: { type: Boolean, default: false },
  isInstructor: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

export const User = mongoose.model<IUser>("User", userSchema);
