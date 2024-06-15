import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { authValidations } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  authControllers.usersignUp
);
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);
router.get("/", authControllers.checkAvailability);

export const AuthRoutes = router;
