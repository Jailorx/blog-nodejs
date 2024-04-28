import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const router = express.Router();

const adminLayout = `../views/layouts/admin`;

router.get("/signin", async (req, res) => {
  try {
    res.render("admin/signin", { layout: adminLayout });
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

router.post("/admin", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
  } catch (error) {
    console.log(error);
  }
});

export default router;
