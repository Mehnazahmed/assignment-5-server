interface TimeSlot {
  startTime: string;
  endTime: string;
}

export const findAvailableSlots = (
  bookings: any[],
  fullDaySlots: TimeSlot[]
): TimeSlot[] => {
  const availableSlots: TimeSlot[] = [];

  fullDaySlots.forEach((slot) => {
    let { startTime, endTime } = slot;

    bookings.forEach((booking) => {
      if (booking.startTime <= startTime && booking.endTime >= endTime) {
        startTime = endTime; // Entire slot is booked
      } else if (
        booking.startTime <= startTime &&
        booking.endTime > startTime
      ) {
        startTime = booking.endTime; // Adjust start time to end of booking
      } else if (booking.startTime < endTime && booking.endTime >= endTime) {
        endTime = booking.startTime; // Adjust end time to start of booking
      } else if (booking.startTime > startTime && booking.endTime < endTime) {
        // Split slot into two available slots
        availableSlots.push({ startTime, endTime: booking.startTime });
        startTime = booking.endTime;
      }
    });

    if (startTime < endTime) {
      availableSlots.push({ startTime, endTime });
    }
  });

  return availableSlots.filter((slot) => slot.startTime < slot.endTime);
};
