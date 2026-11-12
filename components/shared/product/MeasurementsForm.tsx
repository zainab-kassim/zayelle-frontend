"use client";

import { Measurements } from "@/types/cart";
import { INPUT_CLASS } from "@/components/forms/auth/fieldStyles";

interface MeasurementsFormProps {
  values: Partial<Measurements>;
  onChange: (field: keyof Measurements, value: string) => void;
}

const FIELDS: { key: keyof Measurements; label: string }[] = [
  { key: "bust", label: "Bust" },
  { key: "waist", label: "Waist" },
  { key: "hip", label: "Hip" },
];

export default function MeasurementsForm({ values, onChange }: MeasurementsFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-muted font-normal uppercase tracking-[0.14em] text-[10px] sm:text-[11px]">
        Your Measurements (inches)
      </p>
      <p className="font-sans text-muted/80 text-[11px] leading-relaxed -mt-1">
        This piece is made to measure — we need these to cut it to fit you.
      </p>
      <div className="grid grid-cols-3 gap-3">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label htmlFor={`measurement-${key}`} className="font-sans text-muted text-[10px] uppercase tracking-[0.1em]">
              {label}
            </label>
            <input
              id={`measurement-${key}`}
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              placeholder="0"
              value={values[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
