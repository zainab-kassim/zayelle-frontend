// components/checkout/AddressForm.tsx
"use client";

import { Address } from "@/store/checkoutStore";
import { useEffect, useRef, useState } from "react";

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

const COUNTRIES = ["Canada", "United States", "United Kingdom", "Nigeria"];

const COUNTRY_CODE_MAP: Record<string, string> = {
  "Canada":         "CA",
  "United States":  "US",
  "United Kingdom": "GB",
  "Nigeria":        "NG",
};

function getRegionsForCountry(country: string): string[] {
  const code = COUNTRY_CODE_MAP[country];
  if (!code) return [];
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return (Intl.supportedValuesOf as (key: string) => string[])("region")
  .filter((r: string) => r.startsWith(code + "-"))
  .map((r: string) => regionNames.of(r) ?? r)
  .sort();
  } catch {
    return [];
  }
}

export default function AddressForm({
  values, onChange, saveAddress, onSaveAddressChange,
}: AddressFormProps) {
  const [countryOpen,         setCountryOpen]         = useState(false);
  const [provinceOpen,        setProvinceOpen]        = useState(false);
  const [provinceSuggestions, setProvinceSuggestions] = useState<string[]>([]);
  const countryRef  = useRef<HTMLDivElement>(null);
  const provinceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node))
        setCountryOpen(false);
      if (provinceRef.current && !provinceRef.current.contains(e.target as Node))
        setProvinceOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleProvinceChange = (value: string) => {
    onChange("province", value);
    if (value.length > 1) {
      const regions  = getRegionsForCountry(values.country ?? "Canada");
      const filtered = regions.filter(r =>
        r.toLowerCase().includes(value.toLowerCase())
      );
      setProvinceSuggestions(filtered.slice(0, 5));
      setProvinceOpen(filtered.length > 0);
    } else {
      setProvinceOpen(false);
      setProvinceSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Contact section */}
      <div className="flex flex-col gap-4">
        <Field label="Phone Number" id="phone" placeholder="(555) 123-4567"
          value={values.phone ?? ""} onChange={(v) => onChange("phone", v)} />
        <Field label="Email Address" id="email" placeholder="you@example.com"
          value={values.email ?? ""} onChange={(v) => onChange("email", v)} />
      </div>

      {/* Shipping section */}
      <div className="flex flex-col gap-4">
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

          {/* Province — autocomplete */}
          <div className="flex flex-col gap-1.5 relative" ref={provinceRef}>
            <label className="text-[12px] text-[#5a5a5a]"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              State / Province
            </label>
            <input
              type="text"
              placeholder="e.g. Ontario"
              value={values.province ?? ""}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
                text-[#1a1a1a] placeholder:text-[#bbb] outline-none
                focus:border-[#1a1a1a] transition-colors duration-200 bg-white"
              style={{ fontFamily: "Cairo, sans-serif" }}
            />
            {provinceOpen && provinceSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border
                border-[#e0e0e0] rounded-lg shadow-md z-20 overflow-hidden">
                {provinceSuggestions.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      onChange("province", p);
                      setProvinceOpen(false);
                      setProvinceSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-[#4a4a4a]
                      hover:bg-[#f5f5f5] transition-colors"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country — custom dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={countryRef}>
            <label className="text-[12px] text-[#5a5a5a]"
              style={{ fontFamily: "Cairo, sans-serif" }}>Country</label>
            <button
              type="button"
              onClick={() => setCountryOpen(prev => !prev)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
                text-left text-[#1a1a1a] outline-none focus:border-[#1a1a1a]
                transition-colors duration-200 bg-white flex justify-between items-center"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              <span>{values.country || "Select country"}</span>
              <span className="text-[#aaa] text-[10px]">▾</span>
            </button>

            {countryOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border
                border-[#e0e0e0] rounded-lg shadow-md z-20 overflow-hidden">
                {COUNTRIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      onChange("country", c);
                      onChange("province", ""); // reset province on country change
                      setCountryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors
                      hover:bg-[#f5f5f5] ${
                        values.country === c
                          ? "font-semibold text-[#1a1a1a]"
                          : "text-[#4a4a4a]"
                      }`}
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
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