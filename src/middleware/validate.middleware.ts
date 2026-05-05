import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import { logger } from "../utils/logger";
import { ApiResponse } from "../utils/response";

export const ValidateBody =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[] | undefined> =
        z.flattenError(parsed.error).fieldErrors;
      const errors = Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [
          field,
          messages?.[0] ?? "Invalid value",
        ])
      );
      logger.warn("validation failed", { errors });
      return res
        .status(400)
        .json(ApiResponse.error("validation failed", errors));
    }

    req.body = parsed.data;

    next();
  };
