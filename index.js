import dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mainRoutes from "./server/routes/main.js";
import connectDB from "./server/config/db.js";

const app = express();
const PORT = process.env.PORT || 9000;

//connect to MongoDB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Templating Engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", mainRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
