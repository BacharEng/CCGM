import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, birthDate } =
      req.body;

    // Convert email to lowercase before checking if it exists
    const lowercaseEmail = email.toLowerCase();

    const emailExists = await User.findOne({ email: lowercaseEmail });

    if (emailExists) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      phoneNumber,
      email: lowercaseEmail, // Use the lowercase email for the user document
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

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Convert email to lowercase
  const lowercaseEmail = email.toLowerCase();

  try {
    // Use the lowercase email to query the database
    const user = await User.findOne({ email: lowercaseEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      process.exit(1);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Exclude sensitive information before sending user data
    const userResponse = { ...user.toObject(), password: undefined };

    return res.status(200).json({
      message: "User logged in successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user" });
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

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password" });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      process.exit(1);
    }

    // Generate a unique code
    const resetCode = Math.floor(100000 + Math.random() * 900000); // 6 digit code
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); // Code expires in 10 minutes

    // Store the code and expiration time in the user's account
    user.resetCode = resetCode;
    user.resetCodeExpiration = expirationTime;
    await user.save();

    // Send the reset token to the user's email

    return res
      .status(200)
      .json({ message: "Reset token sent successfully", code: resetCode });
  } catch (error) {
    return res.status(500).json({ message: "Error sending reset token" });
  }
};

export const verifyResetCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", isVerified: false });
    }

    if (
      !user.resetCode ||
      !user.resetCodeExpiration ||
      user.resetCodeExpiration < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or expired code", isVerified: false });
    }

    if (user.resetCode === parseInt(code)) {
      // Code is valid
      return res
        .status(200)
        .json({ message: "Code verified successfully", isVerified: true });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid code", isVerified: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error verifying code", isVerified: false });
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
