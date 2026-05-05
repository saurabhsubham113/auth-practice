import winston from "winston";

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    const metaString = Object.keys(meta).length ? JSON.stringify(meta) : "";
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`;
  }
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
  ],
});

// Export a helper function for convenience
export const log = logger;