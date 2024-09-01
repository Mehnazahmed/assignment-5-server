import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import { join } from "path";
import { readFileSync } from "fs";

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  console.log(verifyResponse);

  let result;
  let message = "";
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
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
  } else {
    message = "Payment Failed!";
  }

  const filepath = join(__dirname, "../../../views/confirmation.html");
  let template = readFileSync(filepath, "utf-8");

  template = template.replace("{{message}}", message);
  return template;
};
export const paymentServices = {
  confirmationService,
};
