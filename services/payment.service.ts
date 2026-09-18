import axiosInstance from "@/lib/axiosInstance";


export const InitializePaystackPayment = async (order_id: number) => {
  const response = await axiosInstance.post("/payment/paystack/initialize", {
    order_id,
  });

  return response.data;
};

export const VerifyPaystackPayment = async (reference: string) => {
  const response = await axiosInstance.get(
    `/payment/paystack/verify/${reference}`
  );

  return response.data;
};

export const InitializeStripePayment = async (order_id: number) => {
  const response = await axiosInstance.post(
    "/payment/stripe/create-checkout-session",
    { order_id }
  );

  return response.data;
};

export const VerifyStripePayment = async (session_id: string) => {
  const response = await axiosInstance.get(
    `/payment/stripe/verify-payment/${session_id}`
  );

  return response.data;
};

// user backed out of Stripe Checkout — cancel now instead of waiting for the expired webhook
export const CancelStripeCheckout = async (order_id: number) => {
  const response = await axiosInstance.post(
    "/payment/stripe/cancel-checkout",
    { order_id }
  );

  return response.data;
};

// user hit Cancel/X on Paystack — restores inventory if already abandoned/failed,
// otherwise leaves it for the delayed webhook
export const CancelPaystackCheckout = async (order_id: number) => {
  const response = await axiosInstance.post(
    "/payment/paystack/cancel-checkout",
    { order_id }
  );

  return response.data;
};
