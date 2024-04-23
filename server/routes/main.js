import { Post } from "../models/Post.js";
import express from "express";
const router = express.Router();

//get all posts
router.get("", async (req, res) => {
  try {
    const data = await Post.find({});

    res.render("index", { data });
  } catch (error) {
    console.error(error);
  }
});

//sample data
// const posts = [
//   {
//     title: "The Importance of Regular Exercise",
//     content: "Regular exercise is crucial for maintaining good health...",
//   },
//   {
//     title: "Exploring the Wonders of Nature",
//     content:
//       "Nature offers an abundance of beauty and marvels waiting to be discovered...",
//   },
//   {
//     title: "Tips for Better Sleep",
//     content:
//       "Getting enough quality sleep is essential for overall well-being...",
//   },
//   {
//     title: "Learning a New Language: Challenges and Rewards",
//     content:
//       "Embarking on a journey to learn a new language can be both daunting and immensely rewarding...",
//   },
//   {
//     title: "Healthy Eating Habits for a Balanced Lifestyle",
//     content:
//       "A nutritious diet is key to maintaining optimal health and vitality...",
//   },
//   {
//     title: "The Power of Positive Thinking",
//     content:
//       "Positive thinking can transform your life and lead to greater happiness and success...",
//   },
//   {
//     title: "Exploring Ancient Civilizations",
//     content:
//       "Studying ancient civilizations provides valuable insights into the history of humanity...",
//   },
//   {
//     title: "Embracing Mindfulness in Everyday Life",
//     content:
//       "Practicing mindfulness cultivates awareness and brings greater peace and clarity...",
//   },
//   {
//     title: "The Art of Effective Communication",
//     content:
//       "Mastering the art of communication is essential for building strong relationships and achieving success...",
//   },
//   {
//     title: "Unlocking Creativity: Tips for Inspiration",
//     content:
//       "Creativity flourishes when nurtured with curiosity, exploration, and a willingness to embrace new ideas...",
//   },
// ];

//run once to populate db
// const insertPostData = (() => {
//   Post.insertMany(posts)
//     .then((post) => {
//       console.log("Posts inserted successfully:", post);
//     })
//     .catch((err) => {
//       console.error("Error inserting posts:", err);
//     });
// })();

export default router;
