import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;
const adminLayout = `../views/layouts/admin`;

router.get("/signin", async (req, res) => {
  try {
    res.render("admin/signin", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.render("admin/register", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "user created", user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
