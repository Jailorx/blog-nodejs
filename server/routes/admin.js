import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const router = express.Router();

const adminLayout = `../views/layouts/admin`;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/signin");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/signin", async (req, res) => {
  try {
    console.log("jwtsecret:", process.env.JWT_SECRET);
    res.render("admin/signin", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
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
      res.status(201).redirect("/signin");
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("admin/dashboard", {
      posts,
      layout: adminLayout,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/new-post", authMiddleware, async (req, res) => {
  try {
    res.render("admin/new-post", { layout: adminLayout });
  } catch (error) {}
});

router.post("/new-post", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    try {
      const newPost = new Post({ title, content });

      await Post.create(newPost);
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit-post", { post, layout: adminLayout });
  } catch (error) {}
});

router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {}
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
