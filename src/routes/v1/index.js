import express from "express";
import { userAuth } from "../../middleware/auth.js";
import { getAllCards, getCardDetails } from "./controllers/get.js";
import { login, register, saveNewCard } from "./controllers/post.js";

const router = express.Router();

// *********************************************
// Add, and Manage Card Details
// *********************************************
router.post("/cards", userAuth, saveNewCard);
router.get("/cards", userAuth, getAllCards);
router.get("/cards/:id", userAuth, getCardDetails);

// *********************************************
// User Auth
// *********************************************
router.post("/auth/signup", register);
router.post("/auth/login", login);

export { router };
