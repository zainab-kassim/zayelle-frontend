// app/checkout/page.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckoutStore, Address } from "@/store/checkoutStore";
import CheckoutProgress from "@/components/shared/checkout/CheckoutProgress";
import AddressForm from "@/components/shared/checkout/AddressForm";
import SavedAddressCard from "@/components/shared/checkout/SavedAddressCard";

const EMPTY_ADDRESS: Address = {
  firstName: "", lastName: "", phone: "", email: "",
  street: "", apt: "", postalCode: "", city: "",
  province: "", country: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { currentStep, savedAddress, setStep, setShippingAddress } = useCheckoutStore();

  const [formValues, setFormValues] = useState<Partial<Address>>(EMPTY_ADDRESS);
  const [saveAddress, setSaveAddress] = useState(false);
  const [usingSaved, setUsingSaved] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (field: keyof Address, value: string) => {
    setUsingSaved(false); // deselect saved if user starts typing
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleUseAddress = () => {
    const newValue = !usingSaved;
    setUsingSaved(newValue);
    if (newValue && window.innerWidth < 1024) {
      setTimeout(() => {
        footerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const handleContinue = () => {
    const address = usingSaved ? savedAddress! : formValues as Address;
    setShippingAddress(address);
    setStep(2);
  };

  return (
    <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
      {/* Progress */}
      <CheckoutProgress currentStep={currentStep} />

      {/* Step content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={`border-[#e8e8e8] ${!savedAddress && 'max-w-4xl mx-auto'} border-[0.5px] rounded-2xl overflow-hidden`}>

              {/*
               * flex-col-reverse → saved address on top on mobile
               * lg:flex-row      → side by side on desktop
               */}
              <div className="flex flex-col-reverse lg:flex-row">

                {/* Left — form (70%) */}
                <div className={` ${!savedAddress ? 'w-full' : ' flex-1'} p-6 sm:p-8 lg:border-r  border-[#e8e8e8]`}>
                  <div className="flex flex-row  items-center gap-3 mb-6">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="mt-0.5">
                      <circle cx="11" cy="7" r="4" stroke="#1a1a1a" strokeWidth="1.5" />
                      <path d="M3 19C3 15.134 6.134 12 10 12H12C15.866 12 19 15.134 19 19"
                        stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
                      Shipping & Contact Information
                    </h2>
                  </div>

                  <AddressForm
                    values={formValues}
                    onChange={handleFieldChange}
                    saveAddress={saveAddress}
                    onSaveAddressChange={setSaveAddress}
                  />
                </div>

                {/* Right — saved address (30%) */}
                {savedAddress && (
                <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 p-6 sm:p-8
                  bg-white border-b lg:border-b-0 lg:border-t-0 border-[#e8e8e8]">
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
                className="flex items-center justify-between lg:justify-between
                  flex-col lg:flex-row gap-4 px-6 sm:px-8 py-5 border-t border-[#e8e8e8]"
              >
                {/* Back to Cart — hidden on mobile/tablet */}
                <button
                  onClick={() => router.push("/cart")}
                  className="hidden lg:flex items-center gap-2 text-[13px] text-[#5a5a5a]
                    hover:text-[#1a1a1a] transition-colors duration-200"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  Back to Cart
                </button>

                {/* Continue to Review — full width + centered on mobile */}
                <button
                  onClick={handleContinue}
                  className="w-full lg:w-auto flex items-center justify-center gap-2
                    px-8 py-3.5 bg-[#1a1a1a] text-white text-[12px] font-semibold
                    tracking-[0.2em] uppercase rounded-lg hover:bg-[#333]
                    transition-all duration-300"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  Continue to Review
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="step-2"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="border border-[#e8e8e8] rounded-2xl p-10 text-center"
          >
            <p className="text-[18px] font-semibold text-[#1a1a1a]"
              style={{ fontFamily: '"Expletus Sans", serif' }}>
              Review
            </p>
            <p className="text-[13px] text-[#8a8a8a] mt-2"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              Order review coming soon.
            </p>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)}
                className="text-[13px] text-[#5a5a5a] hover:text-[#1a1a1a] transition-colors"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                ‹ Back
              </button>
              <button onClick={() => setStep(3)}
                className="px-8 py-3.5 bg-[#1a1a1a] text-white text-[12px] font-semibold
                  tracking-[0.2em] uppercase rounded-lg hover:bg-[#333] transition-all"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                Continue ›
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div key="step-3"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="border border-[#e8e8e8] rounded-2xl p-10 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center
              justify-center text-green-500 text-2xl mx-auto mb-4">✓</div>
            <p className="text-[18px] font-semibold text-[#1a1a1a]"
              style={{ fontFamily: '"Expletus Sans", serif' }}>
              Confirmation
            </p>
            <p className="text-[13px] text-[#8a8a8a] mt-2"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              Order confirmation coming soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}