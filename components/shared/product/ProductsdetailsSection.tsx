export default function ProductDetailSkeleton() {
  return (
    <div className="w-full px-4 md:px-12 lg:px-34 xl:px-16 py-6 sm:py-8 animate-pulse">

      {/* Breadcrumb */}
      <div className="h-3 w-52 bg-line/60 mb-5 sm:mb-7" />

      {/* ── Desktop: 2-column ──────────────────────────────────────── */}
      <div className="hidden lg:flex flex-row gap-10 xl:gap-14 items-start">

        {/* Left — image viewer */}
        <div className="w-1/2 flex-shrink-0 flex flex-col gap-4">
          <div className="w-full bg-surface rounded-2xl aspect-[5/4]" />
          <div className="flex flex-row gap-3">
            <div className="w-36 h-36 bg-surface rounded-xl" />
            <div className="w-36 h-36 bg-surface rounded-xl" />
          </div>
        </div>

        {/* Right — product info */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <div className="h-2.5 w-28 bg-line/60" />
            <div className="h-8 w-3/4 bg-line/60" />
            <div className="h-4 w-20 bg-line/60 mt-1" />
            <div className="h-3 w-56 bg-line/60 mt-1" />
            <div className="h-3 w-36 bg-line/60" />
          </div>

          <div className="flex flex-col gap-2 border-t border-line pt-6">
            <div className="h-3 w-full bg-line/60" />
            <div className="h-3 w-full bg-line/60" />
            <div className="h-3 w-3/4 bg-line/60" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-2.5 w-12 bg-line/60" />
            <div className="flex flex-row gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 bg-line/60" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="h-2.5 w-16 bg-line/60" />
            <div className="w-32 h-12 bg-line/60" />
          </div>

          <div className="w-full h-12 bg-line/60" />
        </div>

      </div>

      {/* ── Mobile: single column ─────────────────────────────────── */}
      <div className="flex lg:hidden flex-col gap-6">

        <div className="w-full rounded-2xl bg-surface aspect-[5/4]" />
        <div className="flex flex-row gap-2.5">
          <div className="w-28 h-28 bg-surface rounded-xl" />
          <div className="w-28 h-28 bg-surface rounded-xl" />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="h-2.5 w-24 bg-line/60" />
          <div className="h-6 w-3/4 bg-line/60" />
          <div className="h-4 w-16 bg-line/60 mt-1" />
          <div className="h-3 w-48 bg-line/60 mt-1" />
          <div className="h-3 w-32 bg-line/60" />
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-4">
          <div className="h-3 w-full bg-line/60" />
          <div className="h-3 w-full bg-line/60" />
          <div className="h-3 w-2/3 bg-line/60" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-2.5 w-12 bg-line/60" />
          <div className="flex flex-row gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 bg-line/60" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="h-2.5 w-16 bg-line/60" />
          <div className="w-32 h-12 bg-line/60" />
        </div>

        <div className="w-full h-12 bg-line/60" />

      </div>
    </div>
  );
}
