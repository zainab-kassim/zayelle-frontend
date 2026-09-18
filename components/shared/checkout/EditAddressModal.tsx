"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressForm from "@/components/shared/checkout/AddressForm";
import { Address } from "@/store/checkoutStore";
import { updateShippingInfo } from "@/services/order.service";
import Loader from "@/components/ui/Loader";

interface OrderAddressFields {
  street_address: string;
  apt_no: string;
  customerName: string;
  customerPhonenumber: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  currentAddress: OrderAddressFields;
  onSaved: (updates: OrderAddressFields) => void;
}

// Order fields (backend) use different names than the Address type
// (frontend form) — small adapter both ways instead of teaching
// AddressForm two different shapes.
function orderToFormValues(order: OrderAddressFields): Partial<Address> {
  return {
    customerName: order.customerName,
    phone: order.customerPhonenumber,
    street: order.street_address,
    apt: order.apt_no,
    city: order.city,
    province: order.state,
    postalCode: order.postal_code,
    country: order.country,
  };
}

export default function EditAddressModal({
  isOpen, onClose, orderId, currentAddress, onSaved,
}: EditAddressModalProps) {
  const [formValues, setFormValues] = useState<Partial<Address>>(() => orderToFormValues(currentAddress));
  const [isSaving, setIsSaving] = useState(false);

  // re-sync whenever the modal is (re)opened with a fresh address
  useEffect(() => {
    if (isOpen) setFormValues(orderToFormValues(currentAddress));
  }, [isOpen, currentAddress]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof Address, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const { customerName, phone, street, city, province, country, postalCode } = formValues;
    if (!customerName || !phone || !street || !city || !province || !country || !postalCode) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        order_id: orderId,
        street_address: street,
        apt_no: formValues.apt ?? "",
        customerName,
        customerPhonenumber: phone,
        city,
        state: province,
        postal_code: postalCode,
        country,
      };
      const { order } = await updateShippingInfo(payload);
      onSaved(order);
      toast.success("Shipping address updated");
      onClose();
    } catch {
      toast.error("Failed to update address. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // The whole overlay scrolls as one unit (no nested scroll region inside
    // the panel) — that's deliberate: a bounded-height panel with its own
    // overflow-y-auto is exactly what clips an open dropdown partway down
    // the form. With nothing clipping it, the dropdowns don't need any
    // special positioning to render in full.
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />

      <div className="relative min-h-full flex items-center justify-center p-4 py-10">
        <div
          className="w-full max-w-2xl bg-paper rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            <h2 className="font-sans text-ink font-medium uppercase tracking-[0.08em] text-[12px]">
              Edit Shipping Address
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-muted hover:text-ink transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-6">
            <AddressForm values={formValues} onChange={handleFieldChange} />
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-line">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="font-sans text-muted text-[11px] uppercase tracking-[0.08em] hover:text-ink transition-colors duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-11 min-w-[140px] px-6 bg-ink text-paper font-sans font-normal uppercase tracking-[0.08em] text-[10.5px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
            >
              {isSaving ? <Loader /> : "Save Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
