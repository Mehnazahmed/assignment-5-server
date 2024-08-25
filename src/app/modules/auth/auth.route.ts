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

//user signup

// router.post(
//   "/create-user",
//   // upload.single("file"),
//   // (req: Request & { user?: any }, res: Response, next: NextFunction) => {
//   //   req.body = JSON.parse(req.body.data);
//   //   next();
//   // },
//   validateRequest(UserValidation.userValidationSchema),
//   UserControllers.createUser
// );
router.post(
  "/create-user",
  upload.single("file"),
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);

//create admin
router.post(
  "/create-admin",
  auth(USER_ROLE.superAdmin),
  upload.single("file"),
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createAdmin
);

// router.post(
//   "/create-user",

//   validateRequest(UserValidation.userValidationSchema),
//   authControllers.usersignUp
// );

//user login
router.post(
  "/login",
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser
);

//check time availability
router.get("/", authControllers.checkAvailability);

export const AuthRoutes = router;
