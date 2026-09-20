function OrderItemRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-line last:border-0">
      <div className="flex-shrink-0 w-[76px] h-[86px] sm:w-[86px] sm:h-[96px] rounded-lg bg-surface" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3.5 w-[55%] bg-line/60" />
        <div className="h-3 w-[30%] bg-line/60" />
      </div>
      <div className="h-3.5 w-14 bg-line/60" />
    </div>
  );
}

export default function OrderDetailSkeleton() {
  return (
    <main className="w-full min-h-screen bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24 animate-pulse">
      <div className="flex flex-col gap-8 w-full">

        {/* Order heading + back link */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <div className="h-5 w-40 bg-line/60" />
            <div className="h-3 w-24 bg-line/60" />
          </div>
          <div className="h-3 w-32 bg-line/60" />
        </div>

        {/* Header stats */}
        <div className="rounded-2xl bg-surface p-4 sm:p-6 grid grid-cols-3 gap-x-2 sm:gap-x-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="h-2.5 w-14 bg-line/60" />
              <div className="h-3 w-12 bg-line/60" />
            </div>
          ))}
        </div>

        {/* Tracking */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-line/60" />
                <div className="h-2.5 w-14 bg-line/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Personal info + order summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-surface flex flex-col gap-2">
            <div className="h-3 w-20 bg-line/60 mb-1" />
            <div className="h-3.5 w-32 bg-line/60" />
            <div className="h-3.5 w-40 bg-line/60" />
            <div className="h-3.5 w-28 bg-line/60" />
          </div>
          <div className="rounded-2xl p-6 bg-surface flex flex-col gap-4">
            <div className="h-3 w-24 bg-line/60" />
            <div className="flex justify-between">
              <div className="h-3.5 w-16 bg-line/60" />
              <div className="h-3.5 w-12 bg-line/60" />
            </div>
            <div className="flex justify-between pt-3 border-t border-line">
              <div className="h-3.5 w-14 bg-line/60" />
              <div className="h-3.5 w-16 bg-line/60" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-1">
          <div className="h-3 w-32 bg-line/60 mb-2" />
          <OrderItemRowSkeleton />
          <OrderItemRowSkeleton />
        </div>

      </div>
    </main>
  );
}
