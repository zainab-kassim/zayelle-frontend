import { Suspense } from "react";
import CheckoutContent from "@/components/shared/checkout/CheckoutContent";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}