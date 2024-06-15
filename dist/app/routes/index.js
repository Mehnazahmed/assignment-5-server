"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const facility_route_1 = require("../modules/facility/facility.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/facility",
        route: facility_route_1.FacilityRoutes,
    },
    //booking route
    {
        path: "/check-availability",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/bookings",
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
