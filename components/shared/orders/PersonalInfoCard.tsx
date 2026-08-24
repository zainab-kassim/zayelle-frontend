function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span
        className="text-[11px] sm:text-[13px] text-[#8a8a8a] uppercase tracking-widest"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {label}
      </span>
      <span
        className="text-[13px] sm:text-[15px] text-[#1a1a1a]"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {value}
      </span>
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
    <div className="h-full rounded-2xl p-5 border border-[#f0f0f0]" style={{ background: "#F8F8F8" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <p
            className="text-[11px] sm:text-[13px] font-medium tracking-[0.2em] uppercase text-[#1a1a1a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Personal Info
          </p>
          <InfoRow label="Name" value={name || "—"} />
          <InfoRow label="Email" value={email || "—"} />
          <InfoRow label="Phone" value={phone || "—"} />
        </div>

        <hr className="sm:hidden border-t border-[#e8e8e8] my-1" />

        <div className="flex flex-col gap-1">
          <span
            className="text-[11px] sm:text-[13px] text-[#8a8a8a] uppercase tracking-widest"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Shipping Address
          </span>
          <div className="flex flex-col gap-1">
            {addressLines.map((line, i) => (
              <p
                key={i}
                className="text-[13px] sm:text-[15px] text-[#1a1a1a]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
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
