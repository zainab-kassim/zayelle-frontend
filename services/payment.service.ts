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

// called when the user backs out of Stripe Checkout (lands on cancel_url) —
// cancels the pending order and restores inventory right away instead of
// waiting for the checkout.session.expired webhook
export const CancelStripeCheckout = async (order_id: number) => {
  const response = await axiosInstance.post(
    "/payment/stripe/cancel-checkout",
    { order_id }
  );

  return response.data;
};

// called when the user clicks Cancel/X on Paystack (lands on cancel_action) —
// restores inventory if Paystack already reports the transaction abandoned/failed,
// otherwise leaves it for the delayed charge.abandoned webhook
export const CancelPaystackCheckout = async (order_id: number) => {
  const response = await axiosInstance.post(
    "/payment/paystack/cancel-checkout",
    { order_id }
  );

  return response.data;
};
