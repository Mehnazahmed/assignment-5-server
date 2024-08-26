import { NextFunction, Request, Response, Router } from "express";
import { facilityControllers } from "./facility.controller";
import validateRequest from "../../middlewares/validateRequest";
import { facilityValidation } from "./facility.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

//create facility
router.post(
  "/",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(facilityValidation.facilityValidationSchema),
  facilityControllers.createFacility
);
//update facility
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(facilityValidation.updateFacilityValidationSchema),
  facilityControllers.updateFacility
);
//delete facility
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  facilityControllers.deleteFacility
);
//get all facilities
router.get("/", facilityControllers.getAllFacilities);

export const FacilityRoutes = router;
