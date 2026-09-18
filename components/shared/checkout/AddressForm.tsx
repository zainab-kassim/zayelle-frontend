"use client";

import { Address } from "@/store/checkoutStore";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { INPUT_CLASS, LABEL_CLASS } from "@/components/forms/auth/fieldStyles";

interface AddressFormProps {
  values: Partial<Address>;
  onChange: (field: keyof Address, value: string) => void;
}

function Field({
  label, id, placeholder, value, onChange, className = "",
}: {
  label: string; id: string; placeholder: string;
  value: string; onChange: (v: string) => void; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id} type="text" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
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
  values, onChange
}: AddressFormProps) {
  // ── Country dropdown ───────────────────────────────────────
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // ── Province combobox ──────────────────────────────────────
  // Initialized from values.province (not just "") so a form pre-filled
  // with an existing address — e.g. the edit-address modal — shows the
  // right text on mount instead of an empty field.
  const [searchQuery, setSearchQuery] = useState(values.province ?? "");
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
    <div className="flex flex-col gap-5 w-full">

      {/* Contact section */}
      <div className="flex flex-col gap-3.5">
        <Field label="Customer Name" id="customerName" placeholder="Full name of recipient"
          value={values.customerName ?? ""} onChange={(v) => onChange("customerName", v)} />
        <Field label="Phone Number" id="phone" placeholder="(555) 123-4567"
          value={values.phone ?? ""} onChange={(v) => onChange("phone", v)} />
      </div>

      {/* Shipping section */}
      <div className="flex flex-col gap-3.5">
        <Field label="Street Address" id="street" placeholder="123 Main Street, Apt 4B"
          value={values.street ?? ""} onChange={(v) => onChange("street", v)} />

        <div className="grid grid-cols-2 gap-3.5">
          <Field label="Apt / Suite / Unit (Optional)" id="apt"
            placeholder="Apt, suite, unit, building, floor, etc."
            value={values.apt ?? ""} onChange={(v) => onChange("apt", v)} />
          <Field label="Postal Code" id="postalCode" placeholder="K1V 7P9"
            value={values.postalCode ?? ""} onChange={(v) => onChange("postalCode", v)} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">

          <Field label="City" id="city" placeholder="Ottawa"
            value={values.city ?? ""} onChange={(v) => onChange("city", v)} />

          {/* Country — custom dropdown */}
          <div className="flex flex-col gap-1.5 relative" ref={countryRef}>
            <label className={LABEL_CLASS}>Country</label>
            <button
              type="button"
              onClick={() => setCountryOpen(prev => !prev)}
              className={`${INPUT_CLASS} text-left flex justify-between items-center`}
            >
              <span className="text-nowrap text-clip">{values.country || "Select country"}</span>
              <span className="text-muted text-[10px]">▾</span>
            </button>

            {countryOpen && (
              <div className="absolute max-h-32 overflow-y-auto top-full left-0 right-0 mt-1 bg-paper border border-line rounded-lg shadow-[0_12px_28px_rgba(23,23,26,0.1)] z-20">
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
                    className={`w-full text-left px-4 py-2.5 font-sans text-[12px] transition-colors duration-200 hover:bg-surface ${
                      values.country === c ? "font-medium text-ink" : "text-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Province — accessible combobox, locked until a country is picked */}
          <div className="flex flex-col gap-1.5 relative" ref={provinceRef}>
            <label htmlFor="province" className={LABEL_CLASS}>
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
              placeholder={values.country ? "e.g. Ontario" : "Select a country first"}
              value={searchQuery}
              disabled={!values.country}
              onFocus={openProvince}
              onChange={(e) => handleProvinceSearch(e.target.value)}
              onKeyDown={handleProvinceKeyDown}
              autoComplete="off"
              className={`${INPUT_CLASS} disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface`}
            />

            {provinceOpen && suggestions.length > 0 && (
              <div
                ref={listRef}
                role="listbox"
                className="absolute top-full left-0 right-0 mt-1 bg-paper border border-line rounded-lg shadow-[0_12px_28px_rgba(23,23,26,0.1)] z-20 overflow-y-auto max-h-36"
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
                    className={`px-4 py-2.5 font-sans text-[12px] cursor-pointer transition-colors duration-200 ${
                      idx === highlightedIndex
                        ? "bg-surface text-ink"
                        : values.province === p
                          ? "font-medium text-ink bg-surface/60"
                          : "text-muted hover:bg-surface"
                    }`}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}

            {provinceOpen && suggestions.length === 0 && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-paper border border-line rounded-lg shadow-[0_12px_28px_rgba(23,23,26,0.1)] z-20 px-4 py-3 font-sans text-[11px] text-muted">
                No results for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
