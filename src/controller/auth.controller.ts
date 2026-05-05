import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { ApiResponse } from "../utils/response";
import { authService, AuthServiceError } from "../services/auth.services";

export const LoginController = async (req: Request, res: Response) => {
  try {
    const user = await authService.loginUser(req.body);

    return res.status(200).json(ApiResponse.success(user));
  } catch (error) {
    if (error instanceof AuthServiceError) {
      if (error.code === "NO_USER_FOUND") {
        return res.status(400).json(ApiResponse.error(error.message));
      }
      if (error.code === "PASSWORD_COMPARE_FAILED") {
        return res.status(400).json(ApiResponse.error(error.message));
      }

      if (error.code === "USER_LOGIN_FAILED") {
        return res
          .status(500)
          .json(ApiResponse.error(error.message, error.cause));
      }
    }

    const err = error instanceof Error ? error.message : "Unknown error";
    logger.error("Login error", { err });
    return res.status(500).json(ApiResponse.error("Internal server error", err));
  }
};

export const RegisterController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await authService.findEmail(email);

    if (user?.email || user?.phoneNumber) {
      return res.status(400).json(ApiResponse.error("user already exists"));
    }
    const newUser = await authService.createUser(req.body);
    return res.status(201).json(ApiResponse.success(newUser));
  } catch (error) {
    const err = error instanceof Error ? error.message : "Unknown error";
    logger.error("Registration error", {
      err,
    });
    return res
      .status(500)
      .json(ApiResponse.error("Internal server error", err));
  }
};
