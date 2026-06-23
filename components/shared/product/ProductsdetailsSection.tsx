export default function ProductDetailSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-12 py-8 bg-white animate-pulse">

      {/* ── Desktop: 2-column ──────────────────────────────────────── */}
      <div className="hidden md:flex flex-row gap-10 lg:gap-16 items-start">

        {/* Left — image viewer */}
        <div className="w-[55%] flex-shrink-0">
          <div
            className="w-full rounded-2xl bg-[#EEEEEE]"
            style={{ aspectRatio: "3/3.6" }}
          />
        </div>

        {/* Right — product info */}
        <div className="flex-1 pt-2 flex flex-col gap-6">
          {/* Collection */}
          <div className="h-3 w-44 bg-[#e0e0e0] rounded-full" />

          {/* Price */}
          <div className="h-10 w-28 bg-[#e0e0e0] rounded-full" />

          {/* Description lines */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full bg-[#e0e0e0] rounded-full" />
            <div className="h-3 w-full bg-[#e0e0e0] rounded-full" />
            <div className="h-3 w-3/4 bg-[#e0e0e0] rounded-full" />
          </div>

          {/* Size label + pills */}
          <div className="flex flex-col gap-3">
            <div className="h-3 w-20 bg-[#e0e0e0] rounded-full" />
            <div className="flex flex-row gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#e0e0e0]" />
              ))}
            </div>
          </div>

          {/* Quantity label + control */}
          <div className="flex flex-col gap-3">
            <div className="h-3 w-20 bg-[#e0e0e0] rounded-full" />
            <div className="flex flex-row">
              <div className="w-32 h-10 bg-[#e0e0e0] rounded-md" />
            </div>
          </div>

          {/* Add to cart button */}
          <div className="w-full h-14 bg-[#e0e0e0] rounded-md" />
        </div>

      </div>

      {/* ── Mobile: single column ─────────────────────────────────── */}
      <div className="flex md:hidden flex-col gap-6">

        {/* Image */}
        <div
          className="w-full rounded-2xl bg-[#EEEEEE]"
          style={{ aspectRatio: "3/3.6" }}
        />

        {/* Collection */}
        <div className="h-3 w-36 bg-[#e0e0e0] rounded-full" />

        {/* Price */}
        <div className="h-9 w-24 bg-[#e0e0e0] rounded-full" />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-[#e0e0e0] rounded-full" />
          <div className="h-3 w-full bg-[#e0e0e0] rounded-full" />
          <div className="h-3 w-2/3 bg-[#e0e0e0] rounded-full" />
        </div>

        {/* Size */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 bg-[#e0e0e0] rounded-full" />
          <div className="flex flex-row gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-[#e0e0e0]" />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col gap-3">
          <div className="h-3 w-20 bg-[#e0e0e0] rounded-full" />
          <div className="w-32 h-10 bg-[#e0e0e0] rounded-md" />
        </div>

        {/* Add to cart */}
        <div className="w-full h-14 bg-[#e0e0e0] rounded-md" />

      </div>
    </div>
  );
}