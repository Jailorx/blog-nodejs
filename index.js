import dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const PORT = process.env.PORT || 9000;

//Templating Engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.send("Welcome to my blog application");
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
