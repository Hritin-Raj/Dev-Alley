import Users from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { sendWelcomeEmail } from "../services/nodemailer.js";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "Password invalid" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "30m",
    });
    res
      .status(200)
      .json({ message: "Login Successful", token: token, user: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occured while logging in" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email: email });
    // console.log("existing user", existingUser);

    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Users({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
      expiresIn: "30m",
    });

    // Send a welcome email
    const emailContent = {
      name: name,
      email: email,
      message: `Welcome to our platform, ${name}!\n\nWe're excited to have you on board. If you have any questions, feel free to reach out to us.\n\nBest Regards.`,
    };
    await sendWelcomeEmail(emailContent);

    res
      .status(200)
      .json({ message: "Signup successful", token: token, user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "An error occured while signing up " });
  }
};
