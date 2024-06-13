import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  authControllers.usersignUp
);
router.post("/login", authControllers.loginUser);

export const AuthRoutes = router;
