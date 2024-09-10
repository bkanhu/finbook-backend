import crypto from "crypto";
import "dotenv/config";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

// Validate the encryption key
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error(
    "Invalid or missing ENCRYPTION_KEY. It must be a 32-byte (256-bit) key.",
  );
}
function encryptCard(text) {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("Invalid input: text must be a non-empty string");
  }

  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
}

function decryptCard(text, pin) {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("Invalid input: text must be a non-empty string");
  }

  try {
    const textParts = text.split(":");
    if (textParts.length !== 2) {
      throw new Error("Invalid encrypted text format");
    }
    const iv = Buffer.from(textParts[0], "hex");
    const encryptedText = Buffer.from(textParts[1], "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
}
export { decryptCard, encryptCard };
