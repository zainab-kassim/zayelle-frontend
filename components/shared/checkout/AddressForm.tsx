// components/checkout/AddressForm.tsx
"use client";

import { Address } from "@/store/checkoutStore";

interface AddressFormProps {
  values: Partial<Address>;
  onChange: (field: keyof Address, value: string) => void;
  saveAddress: boolean;
  onSaveAddressChange: (value: boolean) => void;
}

function Field({
  label, id, placeholder, value, onChange, className = "",
}: {
  label: string; id: string; placeholder: string;
  value: string; onChange: (v: string) => void; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[12px] text-[#5a5a5a]"
        style={{ fontFamily: "Cairo, sans-serif" }}>
        {label}
      </label>
      <input
        id={id} type="text" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
          text-[#1a1a1a] placeholder:text-[#bbb] outline-none
          focus:border-[#1a1a1a] transition-colors duration-200 bg-white"
        style={{ fontFamily: "Cairo, sans-serif" }}
      />
    </div>
  );
}

const PROVINCES = ["Ontario","Quebec","British Columbia","Alberta","Manitoba",
  "Saskatchewan","Nova Scotia","New Brunswick","Newfoundland","PEI"];
const COUNTRIES  = ["Canada","United States","United Kingdom","Nigeria","Other"];

export default function AddressForm({
  values, onChange, saveAddress, onSaveAddressChange,
}: AddressFormProps) {
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Contact section */}
      <div className="flex flex-col gap-4">
        <p className="text-[13px] -mb-3.5  font-bold tracking-[0.13em] uppercase text-[#1a1a1a]">
          Contact
        </p>
        <Field label="Phone Number" id="phone" placeholder="(555) 123-4567"
          value={values.phone ?? ""} onChange={(v) => onChange("phone", v)} />
        <Field label="Email Address" id="email" placeholder="you@example.com"
          value={values.email ?? ""} onChange={(v) => onChange("email", v)} />
      </div>

      {/* Shipping section */}
      <div className="flex flex-col gap-4">
        <p className="text-[13px] -mb-3 font-bold tracking-[0.13em] uppercase text-[#1a1a1a]">
          Shipping Address
        </p>

        <Field label="Street Address" id="street" placeholder="123 Main Street, Apt 4B"
          value={values.street ?? ""} onChange={(v) => onChange("street", v)} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Apt / Suite / Unit (Optional)" id="apt"
            placeholder="Apt, suite, unit, building, floor, etc."
            value={values.apt ?? ""} onChange={(v) => onChange("apt", v)} />
          <Field label="Postal Code" id="postalCode" placeholder="K1V 7P9"
            value={values.postalCode ?? ""} onChange={(v) => onChange("postalCode", v)} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="City" id="city" placeholder="Ottawa"
            value={values.city ?? ""} onChange={(v) => onChange("city", v)} />

          {/* Province */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="province" className="text-[12px] text-[#5a5a5a]"
              style={{ fontFamily: "Cairo, sans-serif" }}>State / Province</label>
            <select id="province" value={values.province ?? ""}
              onChange={(e) => onChange("province", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
                text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors
                duration-200 bg-white appearance-none cursor-pointer"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              <option value="">Select</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country" className="text-[12px] text-[#5a5a5a]"
              style={{ fontFamily: "Cairo, sans-serif" }}>Country</label>
            <select id="country" value={values.country ?? "Canada"}
              onChange={(e) => onChange("country", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
                text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors
                duration-200 bg-white appearance-none cursor-pointer"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Save checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer mt-1">
          <input type="checkbox" checked={saveAddress}
            onChange={(e) => onSaveAddressChange(e.target.checked)}
            className="w-4 h-4 rounded border border-[#d0d0d0] accent-[#1a1a1a]" />
          <span className="text-[12px] text-[#5a5a5a]"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            Save this address for faster checkout next time
          </span>
        </label>
      </div>
    </div>
  );
}