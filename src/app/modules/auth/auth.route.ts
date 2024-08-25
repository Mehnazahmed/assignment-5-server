import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { authValidations } from "./auth.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserControllers } from "../user/user.controller";

const router = Router();

router.post(
  "/signup",
  upload.single("file"),
  validateRequest(UserValidation.userValidationSchema),
  authControllers.usersignUp
);

router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createAdmin
);

router.get("/", authControllers.checkAvailability);

export const AuthRoutes = router;
