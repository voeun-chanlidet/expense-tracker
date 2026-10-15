import "dotenv/config";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  }),
);

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
