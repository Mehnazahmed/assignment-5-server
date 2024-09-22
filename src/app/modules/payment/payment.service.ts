import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import { join } from "path";
import { readFileSync } from "fs";

interface BookingDetails {
  facility: string;
  date: string;
  price: number;
  status: string;
}

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse);

  let result;
  let message = "";
  let bookingDetails: BookingDetails = {
    facility: "",
    date: "",
    price: 0,
    status: "",
  };
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    const bookingData = await Booking.findOne({ transactionId })
      .populate("facility")
      .populate("user");

    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "paid",
        isBooked: "confirmed",
      },
      {
        new: true,
      }
    );

    message = "Successfully paid";
    bookingDetails = {
      facility: (bookingData?.facility as any)?.name || "",
      date: bookingData?.date ? bookingData.date.toISOString() : "",
      price: bookingData?.payableAmount || 0,
      status: bookingData?.isBooked || "",
    };
  } else {
    message = "Payment Failed!";
  }

  const filepath = join(
    __dirname,
    "../../../../public/views/confirmation.html"
  );
  let template = readFileSync(filepath, "utf-8");

  template = template.replace("{{message}}", message);

  template = template
    .replace("{{facilityName}}", bookingDetails.facility)
    .replace("{{bookingDate}}", bookingDetails.date)
    .replace("{{price}}", bookingDetails.price.toString())
    .replace("{{status}}", bookingDetails.status);

  return template;
};
export const paymentServices = {
  confirmationService,
};
