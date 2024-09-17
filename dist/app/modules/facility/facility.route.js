"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = require("express");
const facility_controller_1 = require("./facility.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
//create facility
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    // req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(facility_validation_1.facilityValidation.facilityValidationSchema), facility_controller_1.facilityControllers.createFacility);
//update facility
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(facility_validation_1.facilityValidation.updateFacilityValidationSchema), facility_controller_1.facilityControllers.updateFacility);
//delete facility
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.facilityControllers.deleteFacility);
//get all facilities
router.get("/", facility_controller_1.facilityControllers.getAllFacilities);
router.get("/:id", facility_controller_1.facilityControllers.getFaicilityById);
exports.FacilityRoutes = router;
