import axiosInstance from "@/lib/axiosInstance";


export const InitializePayment = async (order_id: number) => {
    console.log('order' ,order_id)
  const response = await axiosInstance.post("/payment/paystack/initialize", {
    order_id,
  });
  console.log(response)

  return response.data;
};

export const VerifyPayment = async (reference: string) => {
  const response = await axiosInstance.post(
    `/payment/paystack/verify/${reference}`
  );
console.log(response.data)
  return response.data;
};