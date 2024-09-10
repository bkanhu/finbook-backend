import bcrypt from "bcrypt";
import { Card } from "../../../model/card.js";
import { User } from "../../../model/user.js";
import { encryptCard } from "../../../utils/encryption-utils.js";
import { generateToken } from "../../../utils/generateToken.js";
import { sendResponse } from "../../../utils/sendResponse.js";

const saveNewCard = async (req, res) => {
  try {
    const { cardHolderName, lastFourDigits, cvv, expiryDate, cardType } =
      req.body;
    const userId = req.user.userId; // Get userId from the decoded JWT token
    console.log(req.user);

    // Validate input
    if (
      !cardHolderName ||
      !lastFourDigits ||
      !cvv ||
      !expiryDate ||
      !cardType
    ) {
      return sendResponse(
        res,
        400,
        "Failed",
        "All card details are required",
        null,
      );
    }

    // Validate last four digits format (simple check for 4 digits)
    if (!/^\d{4}$/.test(lastFourDigits)) {
      return sendResponse(
        res,
        400,
        "Failed",
        "Invalid last four digits format",
        null,
      );
    }

    const card = new Card({
      userId,
      cardHolderName,
      cardType,
      lastFourDigits,
      cvv: await encryptCard(cvv),
      expiryDate: await encryptCard(expiryDate),
    });

    // console.log("New Card: ", card);
    await card.save();

    return sendResponse(
      res,
      201,
      "Successful",
      "Card saved successfully",
      null,
    );
  } catch (error) {
    console.error("Error saving new card:", error);
    return sendResponse(res, 500, "Failed", "Internal Server Error", null);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Remove the password from the user object before sending the response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    // Create Cookie and set user
    const token = generateToken(savedUser);

    res.cookie("token", token, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    // Send response
    return sendResponse(
      res,
      201,
      "Successful",
      "User registered successfully",
      {
        user: userResponse,
      },
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return sendResponse(res, 500, "Failed", "Internal Server Error", null);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, "Unsuccessful", "User not found", null);
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(
        res,
        401,
        "Unsuccessful",
        "Invalid credentials",
        null,
      );
    }

    // Generate token
    const token = generateToken(user);

    // Set cookie
    res.cookie("token", token, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    // Remove password from user object
    const userResponse = user.toObject();
    delete userResponse.password;

    // Send successful response
    return sendResponse(res, 200, "Successful", "Login successful", {
      user: userResponse,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return sendResponse(res, 500, "Failed", "Internal Server Error", null);
  }
};

export { login, register, saveNewCard };
