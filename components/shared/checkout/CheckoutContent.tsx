"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckoutStore, Address } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/shared/checkout/CheckoutProgress";
import AddressForm from "@/components/shared/checkout/AddressForm";
import SavedAddressCard from "@/components/shared/checkout/SavedAddressCard";
import EditAddressModal from "@/components/shared/checkout/EditAddressModal";
import ReviewOrder from "@/components/shared/ReviewOrder";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from 'sonner';
import { createOrder, updateShippingInfo } from "@/services/order.service";
import { useCurrencyStore } from "@/store/currencyStore";
import { getCartItems } from "@/services/cart.service";
import { InitializePaystackPayment, VerifyPaystackPayment, InitializeStripePayment, VerifyStripePayment, CancelStripeCheckout, CancelPaystackCheckout } from "@/services/payment.service";
import Loader from "@/components/ui/Loader";

const EMPTY_ADDRESS: Address = {
  customerName: "", phone: "", email: "",
  street: "", apt: "", postalCode: "", city: "",
  province: "", country: "",
};

// Failed/pending icons drawn to match the weight of the icons8 checkmark
// used for a successful outcome (and reused from the booking-consultation
// confirmation screen), so all three outcome states read as one family.
function OutcomeIcon({ status }: { status: "success" | "pending" | "failed" }) {
  if (status === "success") {
    return (
      <Image
        src="https://img.icons8.com/?size=100&id=kCNfpZEhheCl&format=png&color=000000"
        alt="Success"
        width={44}
        height={44}
      />
    );
  }
  if (status === "failed") {
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6M9 9l6 6" />
      </svg>
    );
  }
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-ink" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export default function CheckoutContent() {
  const router = useRouter();
  const {
    hasHydrated,
    currentStep,
    orderResponse,
    savedAddress,
    setCartItems,
    cartItems,
    setShippingAddress,
    advanceToReview,
    paymentStatus,
    paymentMessage,
    paymentReference,
    paymentProvider,
    setPaymentReference,
    setPaymentOutcome,
    updateOrderAddress,
    resetCheckout,
  } = useCheckoutStore();
  const [formValues, setFormValues] = useState<Partial<Address>>(EMPTY_ADDRESS);
  const [usingSaved, setUsingSaved] = useState(false);
  const [ispaying, setIspaying] = useState(false)
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const { currency } = useCurrencyStore();


  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitprice * item.quantity,
    0
  );


  const footerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(
    Boolean(searchParams.get("reference") ?? searchParams.get("trxref") ?? searchParams.get("session_id"))
  );
  // Stripe sends the browser here (cancel_url) when the user backs out of Checkout
  const [isCanceling, setIsCanceling] = useState(searchParams.get("canceled") === "1");

  // handles Paystack's redirect callback (?reference=/?trxref=)
  const verifyPaystackPaymentReference = async (reference: string) => {
    try {
      const result = await VerifyPaystackPayment(reference);
      if (result.status === "success") {
        setPaymentOutcome("success", result.message || "Your payment was successful.");
      } else if (result.status === "pending") {
        setPaymentOutcome("pending", result.message || "Your payment is still processing.");
      } else {
        setPaymentOutcome("failed", result.message || "Payment could not be confirmed.");
      }
    } catch (error: any) {
      // our check failed, not necessarily the payment — let the user re-check
      setPaymentOutcome(
        "pending",
        error?.response?.data?.message || "We couldn't confirm your payment status. Please check again."
      );
    }
  };

  // this handles Stripe Checkout's redirect callback (?session_id=)
  const verifyStripePaymentReference = async (session_id: string) => {
    try {
      const result = await VerifyStripePayment(session_id);
      if (result.status === "success") {
        setPaymentOutcome("success", result.message || "Your payment was successful.");
      } else if (result.status === "pending") {
        setPaymentOutcome("pending", result.message || "Your payment is still processing.");
      } else {
        setPaymentOutcome("failed", result.message || "Payment could not be confirmed.");
      }
    } catch (error: any) {
      setPaymentOutcome(
        "pending",
        error?.response?.data?.message || "We couldn't confirm your payment status. Please check again."
      );
    }
  };

  useEffect(() => {
    const reference = searchParams.get("reference") ?? searchParams.get("trxref");
    const session_id = searchParams.get("session_id");
    const canceled = searchParams.get("canceled");
    const canceledOrderId = searchParams.get("order_id");
    const canceledProvider = searchParams.get("provider");

    if (canceled === "1") {
      (async () => {
        try {
          // the provider webhook (checkout.session.expired / charge.abandoned)
          // is the backstop if this call fails or never runs
          if (canceledOrderId) {
            const id = Number(canceledOrderId);
            // startsWith, not ===, in case Paystack tacks its own params on
            if (canceledProvider?.startsWith("paystack")) {
              await CancelPaystackCheckout(id);
            } else {
              await CancelStripeCheckout(id);
            }
          }
        } catch {
          // ignore — webhook restores inventory either way
        } finally {
          resetCheckout();
          setIsCanceling(false);
          toast.info("Checkout canceled. Your items are still in your cart.");
          // strip the params so a refresh doesn't re-trigger this
          router.replace("/checkout");
        }
      })();
      return;
    }

    if (reference) {
      setPaymentReference(reference, "paystack");
      verifyPaystackPaymentReference(reference).finally(() => {
        setIsVerifyingPayment(false);
        // clean the reference out of the URL so a refresh doesn't re-trigger this
        router.replace("/checkout");
      });
      return;
    }

    if (session_id) {
      setPaymentReference(session_id, "stripe");
      verifyStripePaymentReference(session_id).finally(() => {
        setIsVerifyingPayment(false);
        router.replace("/checkout");
      });
    }
  }, [searchParams]);

  const handleCheckStatus = async () => {
    if (!paymentReference) return;
    setIsCheckingStatus(true);
    try {
      if (paymentProvider === "stripe") {
        await verifyStripePaymentReference(paymentReference);
      } else {
        await verifyPaystackPaymentReference(paymentReference);
      }
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleStartNewCheckout = () => {
    resetCheckout();
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setCartItems(cartItems);
      } catch (error) {

      }
    }
    fetchCartItems();
  }, []);

  // email isn't collected in the address form — it comes from the logged-in
  // account (stashed in localStorage at login/signup)
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setFormValues((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleFieldChange = (field: keyof Address, value: string) => {
    setUsingSaved(false); // deselect saved if user starts typing
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = (): Address | null => {
    if (!usingSaved) {
      const { customerName, phone, street, city, province, country, postalCode } = formValues;
      if (!customerName || !phone || !street || !city || !province || !country || !postalCode) {
        toast.error("Please fill in all required fields before continuing.");
        return null;
      }
    }
    const address = usingSaved ? savedAddress! : (formValues as Address);
    setShippingAddress(address);
    return address;
  };

  const handleConfirmOrder = async () => {
    if (ispaying) return; // block duplicate submits
    const address = handleContinue();
    if (!address) return; // validation failed, toast already shown, don't proceed
    setIspaying(true);
    try {
      // an order already exists for this checkout (e.g. the user got back to
      // step 1 via browser back/refresh) — update its shipping info instead
      // of creating a second order for the same cart
      if (orderResponse) {
        const { order } = await updateShippingInfo({
          order_id: orderResponse.order.id,
          street_address: address.street,
          apt_no: address.apt,
          customerName: address.customerName,
          customerPhonenumber: address.phone,
          city: address.city,
          state: address.province,
          postal_code: address.postalCode,
          country: address.country,
        });
        advanceToReview({ ...orderResponse, order: { ...orderResponse.order, ...order } });
        return;
      }

      const response = await createOrder({
        cart_id: cartItems[0].cart_id,
        street_address: address.street,
        apt_no: address.apt,
        customerName: address.customerName,
        customerPhonenumber: address.phone,
        city: address.city,
        state: address.province,
        postal_code: address.postalCode,
        country: address.country,
      });
      advanceToReview(response);

      toast.success("Order created successfully");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIspaying(false);
    }
  };

  const handlePaystackPayment = async () => {
    if (!orderResponse) return (
      toast.error('Order not found. Please try again.')
    )
    try {
      const response = await InitializePaystackPayment(orderResponse.order.id);
      // already paid (e.g. redirect-back was missed earlier) — nothing to redirect to
      if (response.status === "success") {
        setPaymentOutcome("success", response.message || "Your payment was successful.");
        return;
      }
      window.location.href = response.auth_url;
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to initialize payment. Please try again.");
    }
  };

  const handleStripePayment = async () => {
    if (!orderResponse) return (
      toast.error('Order not found. Please try again.')
    )
    try {
      const response = await InitializeStripePayment(orderResponse.order.id);
      // already paid (e.g. redirect-back was missed earlier) — nothing to redirect to
      if (response.status === "success") {
        setPaymentOutcome("success", response.message || "Your payment was successful.");
        return;
      }
      window.location.href = response.url;
    } catch (error: any) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to initialize payment. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (isInitializingPayment) return; // block duplicate submits
    // the checkout store rehydrates orderResponse from sessionStorage
    // asynchronously — on a fresh reload this can still read null for a
    // moment even though a real order exists, so wait it out instead of
    // treating that gap as a missing order
    if (!hasHydrated) {
      toast.info("Still loading your order, try again in a moment.");
      return;
    }
    setIsInitializingPayment(true);
    try {
      if (currency === "NGN") {
        await handlePaystackPayment();
      } else {
        await handleStripePayment();
      }
    } finally {
      setIsInitializingPayment(false);
    }
  };

  const handleUseAddress = () => {
    const newValue = !usingSaved;
    setUsingSaved(newValue);
    if (newValue) {
      setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };


  return (
    <main className="w-full min-h-screen bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24">
      {/* Progress */}
      <CheckoutProgress currentStep={currentStep} />

      {/* Step content */}
      <AnimatePresence mode="wait">
        {isVerifyingPayment || isCanceling ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div key="verifying"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-line rounded-2xl p-12 sm:p-16 text-center flex flex-col items-center gap-5"
            >
              <PageLoader size={44} label={isCanceling ? "Canceling checkout" : "Confirming your payment"} />
              <p className="font-sans text-muted text-[12px]">
                {isCanceling ? "Canceling checkout…" : "Confirming your payment…"}
              </p>
            </motion.div>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className={`border-line ${!savedAddress && 'max-w-4xl mx-auto'} border rounded-2xl bg-paper`}>

                  {/*
               * flex-col-reverse → saved address on top on mobile
               * lg:flex-row      → side by side on desktop
               */}
                  <div className="flex flex-col-reverse lg:flex-row">

                    {/* Left — form (70%) */}
                    <div className={`${!savedAddress ? 'w-full' : 'flex-1'} p-5 sm:p-6 lg:border-r border-line`}>
                      <div className="flex flex-row items-center gap-2 mb-5">
                        <svg width="15" height="15" viewBox="0 0 22 22" fill="none" className="text-ink flex-shrink-0" aria-hidden="true">
                          <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M3 19C3 15.134 6.134 12 10 12H12C15.866 12 19 15.134 19 19"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <h2 className="font-sans text-ink font-medium uppercase tracking-[0.08em] text-[11px]">
                          Shipping &amp; Contact Information
                        </h2>
                      </div>

                      <AddressForm
                        values={formValues}
                        onChange={handleFieldChange}
                      />
                    </div>

                    {/* Right — saved address (30%) */}
                    {savedAddress && (
                      <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 p-5 sm:p-6 bg-paper border-b lg:border-b-0 border-line">
                        <SavedAddressCard
                          address={savedAddress}
                          isSelected={usingSaved}
                          onUseAddress={handleUseAddress}
                        />
                      </div>
                    )}

                  </div>

                  {/* Footer nav */}
                  <div
                    ref={footerRef}
                    className="flex items-center justify-between lg:justify-between flex-col lg:flex-row gap-3 px-5 sm:px-6 py-4 border-t border-line"
                  >
                    {/* Back to Cart — hidden on mobile/tablet */}
                    <button
                      onClick={() => router.push("/cart")}
                      className="hidden lg:inline-block font-sans text-muted text-[11px] uppercase tracking-[0.08em] border-b border-ink/40 hover:border-ink hover:text-ink transition-colors duration-200 pb-0.5"
                    >
                      Back to Cart
                    </button>

                    {/* Continue to Review — full width + centered on mobile */}
                    <button disabled={!cartItems || cartItems.length === 0 || ispaying}
                      onClick={handleConfirmOrder}
                      className="w-full lg:w-auto lg:min-w-[160px] h-11 px-7 disabled:opacity-40 flex items-center justify-center gap-2 bg-ink text-paper font-sans font-normal uppercase tracking-[0.08em] text-[10.5px] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed"
                    >
                      {ispaying ? <Loader /> : "Confirm Order"}
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {currentStep === 2 && orderResponse && (
              <motion.div key="step-2">
                <ReviewOrder
                  items={cartItems}
                  OrderDetails={orderResponse!.order}
                  isPaying={ispaying}
                  isLoading={isInitializingPayment}
                  onPayment={handlePayment}
                  onEditAddress={() => setIsEditAddressOpen(true)}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <div className="min-h-[60vh] flex items-center justify-center">
                <motion.div key="step-3"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                  className="border border-line rounded-2xl p-8 sm:p-10 text-center max-w-md mx-auto flex flex-col items-center"
                >
                  <div className="mb-3">
                    <OutcomeIcon status={paymentStatus === "failed" ? "failed" : paymentStatus === "success" ? "success" : "pending"} />
                  </div>

                  <h1 className="font-serif text-ink/85 font-normal text-[17px] sm:text-[19px]">
                    {paymentStatus === "success" && "Order Confirmed"}
                    {paymentStatus === "pending" && "Payment Processing"}
                    {paymentStatus === "failed" && "Payment Unsuccessful"}
                  </h1>

                  <div className="flex flex-col items-center gap-1 mt-2">
                    <p className="font-sans text-muted text-[12px]">
                      {paymentMessage || "Your order has been confirmed."}
                    </p>
                    {paymentStatus === "success" && orderResponse?.order?.id && (
                      <p className="font-sans text-muted/70 text-[11px]">
                        Order #{orderResponse.order.id}
                      </p>
                    )}
                  </div>

                  {paymentStatus === "pending" && (
                    isCheckingStatus ? (
                      <div className="flex flex-col items-center gap-3.5 mt-6">
                        <PageLoader size={32} label="Checking status" />
                        <p className="font-sans text-muted text-[11px]">
                          Checking status…
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleCheckStatus}
                        className="mt-5 h-11 px-7 bg-ink text-paper font-sans font-normal uppercase tracking-[0.08em] text-[10.5px] transition-opacity duration-200 hover:opacity-90"
                      >
                        Check Status
                      </button>
                    )
                  )}

                  {paymentStatus === "failed" && (
                    <button
                      onClick={handleStartNewCheckout}
                      className="mt-5 h-11 px-7 bg-ink text-paper font-sans font-normal uppercase tracking-[0.08em] text-[10.5px] transition-opacity duration-200 hover:opacity-90"
                    >
                      Start New Checkout
                    </button>
                  )}
                </motion.div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>

      {orderResponse && (
        <EditAddressModal
          isOpen={isEditAddressOpen}
          onClose={() => setIsEditAddressOpen(false)}
          orderId={orderResponse.order.id}
          currentAddress={orderResponse.order}
          onSaved={updateOrderAddress}
        />
      )}

    </main>
  );
}
