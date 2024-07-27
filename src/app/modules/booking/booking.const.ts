import { TBooking } from "./booking.interface";

// Define full day slots
export const fullDaySlots = [
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

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
// }

// export const findAvailableSlots = (
//   bookings: any[],
//   fullDaySlots: TimeSlot[]
// ): TimeSlot[] => {
//   const availableSlots: TimeSlot[] = [];

//   fullDaySlots.forEach((slot) => {
//     let { startTime, endTime } = slot;

//     bookings.forEach((booking) => {
//       if (booking.startTime <= startTime && booking.endTime >= endTime) {
//         startTime = endTime; // Entire slot is booked
//       } else if (
//         booking.startTime <= startTime &&
//         booking.endTime > startTime
//       ) {
//         startTime = booking.endTime; // Adjust start time to end of booking
//       } else if (booking.startTime < endTime && booking.endTime >= endTime) {
//         endTime = booking.startTime; // Adjust end time to start of booking
//       } else if (booking.startTime > startTime && booking.endTime < endTime) {
//         // Split slot into two available slots
//         availableSlots.push({ startTime, endTime: booking.startTime });
//         startTime = booking.endTime;
//       }
//     });

//     if (startTime < endTime) {
//       availableSlots.push({ startTime, endTime });
//     }
//   });

//   return availableSlots.filter((slot) => slot.startTime < slot.endTime);
// };
export interface Slot {
  startTime: string;
  endTime: string;
}

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Find available slots based on existing bookings
export const findAvailableSlots = (bookings: any[]) => {
  return fullDaySlots.filter((slot) => {
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
