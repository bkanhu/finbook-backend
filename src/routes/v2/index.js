import express from "express";
const router = express.Router();

// Define routes for v2
router.get("/example", (req, res) => {
  res.json({ message: "This is version 2" });
});

export { router };
