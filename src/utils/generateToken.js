import jwt from "jsonwebtoken";

const generateToken = (existUser) => {
  try {
    const token = jwt.sign({ userId: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log("Error In Generating Token: ", error);
    throw new Error("Error generating tokens.");
  }
};

export { generateToken };
