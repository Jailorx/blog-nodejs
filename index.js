import dotenv from "dotenv";
dotenv.config();
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";

import methodOverride from "method-override";

import mainRoutes from "./server/routes/main.js";
import adminRoutes from "./server/routes/admin.js";
import connectDB from "./server/config/db.js";

const app = express();
const PORT = process.env.PORT || 9000;

//connect to MongoDB
connectDB();

//Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "alchemist",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use(methodOverride("_method"));
app.use(express.static("public"));

//Templating Engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", mainRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
