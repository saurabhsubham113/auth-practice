import express from "express";
import { inspect } from "node:util";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import router from "./routes/auth";
import { prisma } from "./lib/prisma";
import { requestLogger } from "./middleware/request-logger.middleware";
import { logger } from "./utils/logger";

type PrismaStartupError = Error & {
  cause?: unknown;
  meta?: {
    driverAdapterError?: {
      cause?: {
        cause?: unknown;
      };
    };
  };
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", router);

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");

    return res.status(200).json({
      status: "ok",
    });
  } catch (error: any) {
    console.error("DB health check failed:", error?.message);

    return res.status(503).json({
      status: "error",
      message: "database unavailable",
    });
  }
});

app.listen(PORT, () => {
  logger.info("server is running on", { PORT });
});
