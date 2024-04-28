import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const router = express.Router();

const adminLayout = `../views/layouts/admin`;

router.get("/admin", async (req, res) => {
  try {
    res.render("admin/signin", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin/register", async (req, res) => {
  try {
    res.render("admin/register", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin", async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    if (username === "admin" && password === "password")
      res.send("you are logged in");
    else {
      res.send("wrong password or username");
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
