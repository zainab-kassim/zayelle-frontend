function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-sans text-muted uppercase tracking-[0.1em] text-[10px] sm:text-[11px]">
        {label}
      </span>
      <span className="font-sans text-ink/75 font-normal text-[13px] sm:text-[14px]">{value}</span>
    </div>
  );
}

interface PersonalInfoCardProps {
  name: string;
  email: string;
  phone: string;
  addressLines: string[];
  postalCode: string;
}

export default function PersonalInfoCard({
  name,
  email,
  phone,
  addressLines,
  postalCode,
}: PersonalInfoCardProps) {
  return (
    <div className="h-full rounded-2xl p-5 bg-surface">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted flex-shrink-0" aria-hidden="true">
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="8" r="4" />
            </svg>
            <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px]">
              Personal Info
            </p>
          </div>
          <InfoRow label="Name" value={name || "—"} />
          <InfoRow label="Email" value={email || "—"} />
          <InfoRow label="Phone" value={phone || "—"} />
        </div>

        <hr className="sm:hidden border-t border-line my-0.5" />

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" className="text-muted flex-shrink-0" aria-hidden="true">
              <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2ZM10 8.5C9.17 8.5 8.5 7.83 8.5 7C8.5 6.17 9.17 5.5 10 5.5C10.83 5.5 11.5 6.17 11.5 7C11.5 7.83 10.83 8.5 10 8.5Z" fill="currentColor" />
            </svg>
            <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px]">
              Shipping Address
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            {addressLines.map((line, i) => (
              <p key={i} className="font-sans text-ink/75 font-normal text-[13px] sm:text-[14px]">
                {line}
              </p>
            ))}
          </div>
          <InfoRow label="Postal Code" value={postalCode || "—"} />
        </div>
      </div>
    </div>
  );
}
