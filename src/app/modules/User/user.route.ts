import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

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
