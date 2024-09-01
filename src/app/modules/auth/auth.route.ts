import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { authValidations } from "./auth.validation";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserControllers } from "../user/user.controller";
import { facilityControllers } from "../facility/facility.controller";

const router = Router();

router.post(
  "/create-user",
  upload.single("file"),
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

//create admin
router.post(
  "/create-admin",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    // req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createAdmin
);

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
