import { Card } from "../../../model/card.js";
import { decryptCard } from "../../../utils/encryption-utils.js";
import { sendResponse } from "../../../utils/sendResponse.js";

const getAllCards = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from the decoded JWT token

    // Find all cards for the logged-in user
    const cards = await Card.find({ userId });

    // Decrypt card details
    const decryptedCards = cards.map((card) => ({
      id: card._id,
      cardHolderName: card.cardHolderName,
      // cardNumber: decryptCard(card.encryptedCardNumber),
      lastFourDigit: card.lastFourDigits,
      cvv: card.cvv,
      expiryDate: decryptCard(card.expiryDate),
      createdAt: card.createdAt,
    }));

    // Return the decrypted card details
    return sendResponse(
      res,
      200,
      "Successful",
      "Cards retrieved successfully",
      decryptedCards,
    );
  } catch (error) {
    console.error("Error retrieving cards:", error);
    return sendResponse(res, 500, "Failed", "Internal Server Error", null);
  }
};
const getCardDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ message: "Card ID is required" });
    }

    // Find the card
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Return the card details with decrypted cvv and expiry date
    res.json({
      id: card._id,
      cardHolderName: card.cardHolderName,
      cvv: await decryptCard(card.cvv),
      expiryDate: await decryptCard(card.expiryDate),
      createdAt: card.createdAt,
    });
  } catch (error) {
    console.error("Error fetching and decrypting card:", error);
    return sendResponse(
      res,
      500,
      "Failed",
      "Error fetching and decrypting card",
      { error: error.message },
    );
  }
};
export { getAllCards, getCardDetails };
