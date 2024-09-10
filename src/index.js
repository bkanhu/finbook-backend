import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import expressStatusMonitor from "express-status-monitor";
import winston from "winston";
import { connectDB } from "./config/db.js";
import { router as v1Routes } from "./routes/v1/index.js";
import { router as v2Routes } from "./routes/v2/index.js";

const app = express();
const port = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(",");
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressStatusMonitor());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Your routes here
app.use("/api/v1", v1Routes);
app.use("/api/v2", v2Routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

(async () => {
  await connectDB(); // Connect to MongoDB before starting the server

  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
})();
