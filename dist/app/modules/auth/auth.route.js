"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const facility_controller_1 = require("../facility/facility.controller");
const router = (0, express_1.Router)();
//user login
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authControllers.loginUser);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.authValidations.refreshTokenValidationSchema), auth_controller_1.authControllers.refreshToken);
//check time availability
router.get("/", facility_controller_1.facilityControllers.checkAvailability);
exports.AuthRoutes = router;
