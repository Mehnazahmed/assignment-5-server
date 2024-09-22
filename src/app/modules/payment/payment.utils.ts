import axios from "axios";
import config from "../../config";

export const initialPayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.amar_pay_Payment_Url!, {
      store_id: config.amar_pay_storeId,
      signature_key: config.amar_pay_signature_key,
      tran_id: paymentData.transactionId,
      success_url: `https://assignment-5-server.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `https://assignment-5-server.vercel.app/api/payment/confirmation?&status=failed`,
      cancel_url: "https://assignment-5-client-three.vercel.app/",
      amount: paymentData.amount,
      currency: "USD",

      desc: "Merchant Registration Payment",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "Bangladesh",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    return response.data;
  } catch (error) {
    throw new Error("Payment initialization failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.amar_pay_Payment_verify_Url!, {
      params: {
        store_id: config.amar_pay_storeId,
        signature_key: config.amar_pay_signature_key,
        type: "json",
        request_id: tnxId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Payment validation failed!");
  }
};
