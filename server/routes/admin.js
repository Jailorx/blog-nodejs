import express from "express";

const router = express.Router();

const adminLayout = `../views/layouts/admin`;

router.get("/admin", async (req, res) => {
  try {
    res.render("admin/index", { layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

export default router;
