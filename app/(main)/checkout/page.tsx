import { Suspense } from "react";
import CheckoutContent from "@/components/shared/checkout/CheckoutContent";
import PageLoader from "@/components/ui/PageLoader";

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-paper flex items-center justify-center">
        <PageLoader label="Loading checkout" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
