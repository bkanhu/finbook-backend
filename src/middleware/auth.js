import "dotenv/config";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";

const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {
    // Check if JWT secret key is provided
    if (!JWT_SECRET) {
      return sendResponse(
        res,
        401,
        "Unsuccessful",
        "Secret keys not provided.",
        null,
      );
    }

    // Get token from cookies
    const token = req.cookies.token;

    // Check if token is provided
    if (!token) {
      return sendResponse(res, 401, "Unsuccessful", "No token provided.", null);
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Store decoded user info in the request object
    req.user = decoded;

    // Pass control to the next middleware
    next();
  } catch (error) {
    // Handle errors and send response
    return sendResponse(res, 500, "Failed", "Internal Server Error", null);
  }
};

export { userAuth };
