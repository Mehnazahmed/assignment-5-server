import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

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

router.get("/", auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
  "/:email",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUserByEmail
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUserById
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

router.delete("/:id", auth(USER_ROLE.admin), UserControllers.deleteUser);

export const userRoutes = router;
