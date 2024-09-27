import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";

import { authValidations } from "./auth.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserControllers } from "../user/user.controller";
import { facilityControllers } from "../facility/facility.controller";

const router = Router();


//user login
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken
);

//check time availability
router.get("/", facilityControllers.checkAvailability);

export const AuthRoutes = router;
