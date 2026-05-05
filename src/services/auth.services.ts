import { prisma } from "../lib/prisma";
import type { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import { AuthErrorCode } from "./errors/auth-error-code";

export class AuthServiceError extends Error {
  constructor(
    message: string,
    public readonly code: AuthErrorCode,
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

export class AuthService {
  constructor(private readonly db: PrismaClient) {}

  async findEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });
  }

  async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;
    try {
      const user = await this.db.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        throw new AuthServiceError(
          "Email or password is wrong",
          "NO_USER_FOUND",
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new AuthServiceError(
          "email or password is incorrect",
          "PASSWORD_COMPARE_FAILED",
        );
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof AuthServiceError) {
        throw error;
      }
      throw new AuthServiceError("unable to login", "USER_LOGIN_FAILED");
    }
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(data.password, 10);
    } catch {
      throw new AuthServiceError(
        "Failed to secure password",
        "PASSWORD_HASH_FAILED",
      );
    }

    try {
      return await this.db.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
        },
      });
    } catch {
      throw new AuthServiceError("Failed to create user", "USER_CREATE_FAILED");
    }
  }
}

export const authService = new AuthService(prisma);
