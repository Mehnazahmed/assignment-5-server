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
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.bookingSchema),
  bookingControllers.createBooking
);

//get all bookngs
router.get("/", auth(USER_ROLE.admin), bookingControllers.getAllBookings);

// /router.get("/", bookingControllers.checkAvailability);

router.get("/user", auth(USER_ROLE.user), bookingControllers.getUserBookings);

//cancel booking
router.delete(
  "/:id",

  auth(USER_ROLE.user),
  bookingControllers.deleteBooking
);

export const BookingRoutes = router;
