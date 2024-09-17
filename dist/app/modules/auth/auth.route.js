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
const user_constant_1 = require("../user/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_controller_1 = require("../user/user.controller");
const facility_controller_1 = require("../facility/facility.controller");
const router = (0, express_1.Router)();
router.post("/create-user", sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    // req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(auth_validation_1.authValidations.userValidationSchema), user_controller_1.UserControllers.createUser);
//create admin
router.post("/create-admin", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    // req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(auth_validation_1.authValidations.userValidationSchema), user_controller_1.UserControllers.createAdmin);
//user login
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authControllers.loginUser);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.authValidations.refreshTokenValidationSchema), auth_controller_1.authControllers.refreshToken);
//check time availability
router.get("/", facility_controller_1.facilityControllers.checkAvailability);
exports.AuthRoutes = router;
