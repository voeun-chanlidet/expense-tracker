import type { ErrorRequestHandler } from "express";
import { logger } from "../config/logger.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error("Unhandled request error", {
    method: req.method,
    path: req.originalUrl,
    error: err.message,
    stack: err.stack,
  });

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
