import validateRequest from "../../middlewares/validateRequest";
import { bookingControllers } from "./booking.controller";
import { Router } from "express";
import { bookingValidation } from "./booking.validation";

import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = Router();
//create booking
router.post(
  "/",
  // auth(USER_ROLE.user),
  validateRequest(bookingValidation.bookingSchema),
  bookingControllers.createBooking
);

router.get("/");
router.get("/");
router.get("/user");
router.delete("/:id");

export const BookingRoutes = router;
