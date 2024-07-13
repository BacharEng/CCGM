import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcryptjs from "bcryptjs";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, birthDate } =
      req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      birthDate,
      authenticationToken: getRandomInt(10000, 99999),
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      json: JSON.stringify(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { authenticationToken } = req.body;
  const { id } = req.params;

  try {
    const userExists = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userExists.authenticationToken === authenticationToken) {
      await User.findByIdAndUpdate(id, { isAuthenticated: true });
      return res
        .status(200)
        .json({ message: "User authenticated successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid token or token expired" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error authenticating user" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(id, req.body);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};
