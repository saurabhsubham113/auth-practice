import { Router } from "express";
import {
  LoginController,
  RegisterController,
} from "../controller/auth.controller";
import { ValidateBody } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", ValidateBody(loginSchema), LoginController);
router.post("/register", ValidateBody(registerSchema), RegisterController);
router.get("/test", (req, res) => res.json({ message: "All good" }));

export default router;
