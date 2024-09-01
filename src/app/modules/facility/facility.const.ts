import { TBooking } from "../booking/booking.interface";

interface TimeSlot {
  start: string;
  end: string;
}

// // Helper function to generate all time slots
// export const generateAllTimeSlots = (): TimeSlot[] => {
//   const slots: TimeSlot[] = [];
//   for (let hour = 9; hour < 21; hour++) {
//     slots.push({
//       start: `${hour}:00`,
//       end: `${hour + 1}:00`,
//     });
//   }
//   return slots;
// };

// // Helper function to get available slots
// export const getAvailableSlots = (bookings: any[]): TimeSlot[] => {
//   const allTimeSlots = generateAllTimeSlots();
//   const bookedSlots = bookings.map((booking) => ({
//     start: booking.startTime,
//     end: booking.endTime,
//   }));

//   return allTimeSlots.filter(
//     (slot) =>
//       !bookedSlots.some(
//         (booked) => slot.start < booked.end && slot.end > booked.start
//       )
//   );
// };
// Helper function to get available slots based on bookings
// export const getAvailableSlots = (bookings: any[]): TimeSlot[] => {
//   if (bookings.length === 0) {
//     // If no bookings, return slots from 09:00 to 21:00 in 1-hour increments
//     return [
//       { start: "09:00", end: "10:00" },
//       { start: "10:00", end: "11:00" },
//       { start: "11:00", end: "12:00" },
//       { start: "12:00", end: "13:00" },
//       { start: "13:00", end: "14:00" },
//       { start: "14:00", end: "15:00" },
//       { start: "15:00", end: "16:00" },
//       { start: "16:00", end: "17:00" },
//       { start: "17:00", end: "18:00" },
//       { start: "18:00", end: "19:00" },
//       { start: "19:00", end: "20:00" },
//       { start: "20:00", end: "21:00" },
//     ];
//   }

//   const sortedBookings = bookings
//     .map((booking) => ({
//       start: new Date(booking.startTime),
//       end: new Date(booking.endTime),
//     }))
//     .sort((a, b) => a.start.getTime() - b.start.getTime());

//   const availableSlots: TimeSlot[] = [];
//   const startOfDay = new Date();
//   startOfDay.setHours(9, 0, 0, 0); // Start time: 09:00
//   const endOfDay = new Date();
//   endOfDay.setHours(21, 0, 0, 0); // End time: 21:00

//   let currentStart = startOfDay;

//   for (const booking of sortedBookings) {
//     if (currentStart < booking.start) {
//       availableSlots.push({
//         start: formatTime(currentStart),
//         end: formatTime(booking.start),
//       });
//     }
//     currentStart = new Date(
//       Math.max(currentStart.getTime(), booking.end.getTime())
//     );
//   }

//   if (currentStart < endOfDay) {
//     availableSlots.push({
//       start: formatTime(currentStart),
//       end: formatTime(endOfDay),
//     });
//   }

//   return availableSlots;
// };

// const formatTime = (date: Date): string => {
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   return `${hours}:${minutes}`;
// };

const timeStringToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to generate all possible time slots from start to end hour
export const generateAllTimeSlots = (
  startHour: number,
  endHour: number
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      start: `${hour}:00`,
      end: `${hour + 1}:00`,
    });
  }
  return slots;
};

export const getAvailableSlots = (
  bookings: any[],
  startHour: number,
  endHour: number
): TimeSlot[] => {
  const allTimeSlots = generateAllTimeSlots(startHour, endHour);

  //   console.log("All generated slots:", allTimeSlots);

  const bookedSlots = bookings.map((booking) => ({
    start: timeStringToMinutes(booking.startTime),
    end: timeStringToMinutes(booking.endTime),
  }));

  //   console.log("Booked slots in minutes:", bookedSlots);

  return allTimeSlots.filter((slot) => {
    const slotStart = timeStringToMinutes(slot.start);
    const slotEnd = timeStringToMinutes(slot.end);

    const isAvailable = !bookedSlots.some(
      (booked) => slotStart < booked.end && slotEnd > booked.start
    );

    // console.log(
    //   `Checking slot ${slot.start} - ${slot.end}:`,
    //   isAvailable ? "Available" : "Booked"
    // );

    return isAvailable;
  });
};
