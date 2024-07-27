"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAvailableSlots = exports.fullDaySlots = void 0;
// Define full day slots
exports.fullDaySlots = [
    { startTime: "08:00:00", endTime: "10:00:00" },
    { startTime: "08:00:00", endTime: "12:00:00" },
    { startTime: "10:00:00", endTime: "12:00:00" },
    { startTime: "10:00:00", endTime: "13:00:00" },
    { startTime: "10:00:00", endTime: "14:00:00" },
    { startTime: "12:00:00", endTime: "14:00:00" },
    { startTime: "12:00:00", endTime: "16:00:00" },
    { startTime: "14:00:00", endTime: "16:00:00" },
    { startTime: "14:00:00", endTime: "18:00:00" },
    { startTime: "16:00:00", endTime: "18:00:00" },
    { startTime: "16:00:00", endTime: "20:00:00" },
    { startTime: "18:00:00", endTime: "20:00:00" },
];
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
// Find available slots based on existing bookings
const findAvailableSlots = (bookings) => {
    return exports.fullDaySlots.filter((slot) => {
        return bookings.every((booking) => {
            const bookingStart = timeToMinutes(booking.startTime);
            const bookingEnd = timeToMinutes(booking.endTime);
            const slotStart = timeToMinutes(slot.startTime);
            const slotEnd = timeToMinutes(slot.endTime);
            // Check if the slot does not overlap with any booking
            return !(slotStart < bookingEnd && slotEnd > bookingStart);
        });
    });
};
exports.findAvailableSlots = findAvailableSlots;
