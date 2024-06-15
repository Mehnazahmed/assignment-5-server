"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayableAmount = void 0;
function calculatePayableAmount(startTime, endTime, pricePerHour) {
    if (!startTime ||
        !endTime ||
        !(startTime instanceof Date) ||
        !(endTime instanceof Date)) {
        throw new Error("Invalid start or end time. Both must be valid Date objects.");
    }
    if (endTime <= startTime) {
        throw new Error("End time cannot be before or equal to start time.");
    }
    const timeDifferenceInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const payableAmount = timeDifferenceInHours * pricePerHour;
    return payableAmount;
}
exports.calculatePayableAmount = calculatePayableAmount;
