import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    enum: [
      "Visa",
      "MasterCard",
      "Rupay",
      "American Express",
      "Discover",
      "Other",
    ],
    required: true,
  },
  lastFourDigits: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = mongoose.model("Card", cardSchema);
