// components/checkout/AddressForm.tsx
"use client";

import { Address } from "@/store/checkoutStore";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { toast } from 'sonner';

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

const REGIONS: Record<string, string[]> = {
  "Canada": [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
    "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
    "Saskatchewan", "Yukon",
  ],
  "United States": [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
  ],
  "United Kingdom": ["England", "Northern Ireland", "Scotland", "Wales"],
  "Nigeria": [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
    "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti",
    "Enugu", "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara",
  ],
};

export default function AddressForm({
  values, onChange, saveAddress, onSaveAddressChange,
}: AddressFormProps) {
  // ── Country dropdown ───────────────────────────────────────
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // ── Province combobox ──────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const provinceRef = useRef<HTMLDivElement>(null);
  const provinceInput = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node))
        setCountryOpen(false);
      if (provinceRef.current && !provinceRef.current.contains(e.target as Node)) {
        setProvinceOpen(false);
        // revert search query to selected value on blur
        setSearchQuery(values.province ?? "");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [values.province]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const openProvince = () => {
    if (!values.country) return;

    const regions = REGIONS[values.country] ?? [];
    setSearchQuery("");
    setSuggestions(regions);
    setHighlightedIndex(-1);
    setProvinceOpen(true);
  };

  const handleProvinceSearch = (val: string) => {
    setSearchQuery(val);
    const regions = REGIONS[values.country ?? "Canada"] ?? [];
    const filtered = regions.filter(r =>
      r.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered);
    setHighlightedIndex(-1);
    setProvinceOpen(true);
  };

  const selectProvince = (province: string) => {
    onChange("province", province);
    setSearchQuery(province);
    setProvinceOpen(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleProvinceKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!provinceOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") openProvince();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(i => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          selectProvince(suggestions[highlightedIndex]);
        }
        break;
      case "Tab":
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          selectProvince(suggestions[highlightedIndex]);
        }
        setProvinceOpen(false);
        break;
      case "Escape":
        setProvinceOpen(false);
        setSearchQuery(values.province ?? "");
        provinceInput.current?.blur();
        break;
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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

          <Field label="City" id="city" placeholder="Ottawa"
            value={values.city ?? ""} onChange={(v) => onChange("city", v)} />

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
              <span className="text-nowrap text-clip ">{values.country || "Select country"}</span>
              <span className="text-[#aaa] text-[10px]">▾</span>
            </button>

            {countryOpen && (
              <div className="absolute max-h-32 scrollable overflow-y-auto top-full left-0 right-0 mt-1 bg-white border
                border-[#e0e0e0] rounded-lg shadow-md z-20 ">
                {COUNTRIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      onChange("country", c);
                      onChange("province", "");
                      setSearchQuery("");
                      setSuggestions([]);
                      setCountryOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors
                      hover:bg-[#f5f5f5] ${values.country === c
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

          {/* Province — accessible combobox */}
          <div className="flex flex-col gap-1.5 relative" ref={provinceRef}>
            <label htmlFor="province" className="text-[12px] text-[#5a5a5a]"
              style={{ fontFamily: "Cairo, sans-serif" }}>
              State / Province
            </label>
            <input
              id="province"
              ref={provinceInput}
              type="text"
              role="combobox"
              aria-expanded={provinceOpen}
              aria-autocomplete="list"
              aria-haspopup="listbox"
              placeholder="e.g. Ontario"
              value={searchQuery}
              onFocus={() => {
                !values.country
                  ? toast.warning("Please select a country first.")
                  : openProvince();
              }}
              onChange={(e) => {
                if (!values.country) {
                  toast.warning("Please select a country first.");
                  return;
                }
                handleProvinceSearch(e.target.value);
              }}
              onKeyDown={handleProvinceKeyDown}
              autoComplete="off"
              className="w-full px-4 py-2.5 rounded-lg border border-[#e0e0e0] text-[13px]
                text-[#1a1a1a] placeholder:text-[#bbb] outline-none
                focus:border-[#1a1a1a] transition-colors duration-200 bg-white"
              style={{ fontFamily: "Cairo, sans-serif" }}
            />

            {provinceOpen && suggestions.length > 0 && (
              <div
                ref={listRef}
                role="listbox"
                className="absolute top-full left-0 right-0 mt-1 bg-white border
                  border-[#e0e0e0] rounded-lg shadow-md z-20 overflow-y-auto max-h-36"
              >
                {suggestions.map((p, idx) => (
                  <div
                    key={p}
                    role="option"
                    aria-selected={values.province === p}
                    onMouseDown={(e) => {
                      e.preventDefault(); // prevent input blur before click
                      selectProvince(p);
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`px-4 py-2.5 text-[13px] cursor-pointer transition-colors ${idx === highlightedIndex
                      ? "bg-[#f0f0f0] text-[#1a1a1a]"
                      : values.province === p
                        ? "font-semibold text-[#1a1a1a] bg-[#fafafa]"
                        : "text-[#4a4a4a] hover:bg-[#f5f5f5]"
                      }`}
                    style={{ fontFamily: "Cairo, sans-serif" }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}

            {provinceOpen && suggestions.length === 0 && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border
                border-[#e0e0e0] rounded-lg shadow-md z-20 px-4 py-3 text-[12px]
                text-[#aaa]" style={{ fontFamily: "Cairo, sans-serif" }}>
                No results for "{searchQuery}"
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