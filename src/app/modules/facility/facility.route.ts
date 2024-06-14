import { Router } from "express";
import { facilityControllers } from "./facility.controller";
import validateRequest from "../../middlewares/validateRequest";
import { facilityValidation } from "./facility.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

//create facility
router.post(
  "/",
  validateRequest(facilityValidation.facilityValidationSchema),
  facilityControllers.createFacility
);
//update facility
router.put(
  "/:id",
  validateRequest(facilityValidation.updateFacilityValidationSchema),
  facilityControllers.updateFacility
);
//delete facility
router.delete("/:id", facilityControllers.deleteFacility);
//get all facilities
router.get("/", auth(USER_ROLE.user), facilityControllers.getAllFacilities);

export const FacilityRoutes = router;
