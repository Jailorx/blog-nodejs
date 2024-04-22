import dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mainRoutes from "./server/routes/main.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.static("public"));

//Templating Engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", mainRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
