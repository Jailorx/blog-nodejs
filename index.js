import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();
const PORT = process.env.PORT || 9000;

app.get("", (req, res) => {
  res.send("Welcome to my blog application");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
