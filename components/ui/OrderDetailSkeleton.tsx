function OrderItemRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-t border-[#f0f0f0] first:border-t-0">
      <div className="flex-shrink-0 w-[84px] h-[94px] sm:w-[84px] sm:h-[94px] rounded-lg bg-[#efefef]" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3.5 w-[55%] bg-[#e8e8e8] rounded-full" />
        <div className="h-3 w-[30%] bg-[#f0f0f0] rounded-full" />
      </div>
      <div className="hidden sm:block h-3.5 w-10 bg-[#e8e8e8] rounded-full" />
      <div className="hidden sm:block h-3.5 w-14 bg-[#e8e8e8] rounded-full" />
      <div className="h-3.5 w-14 bg-[#e8e8e8] rounded-full" />
    </div>
  );
}

export default function OrderDetailSkeleton() {
  return (
    <main className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10 animate-pulse">
      <div className="flex flex-col gap-8 w-full">

        {/* Header stats */}
        <div className="mt-2 rounded-2xl bg-[#F8F8F8] p-4 sm:p-6 grid grid-cols-4 gap-x-2 sm:gap-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-2.5 w-12 bg-[#e0e0e0] rounded-full" />
              <div className="h-3.5 w-16 bg-[#e0e0e0] rounded-full" />
            </div>
          ))}
        </div>

        {/* Tracking */}
        <div className="-mt-4 flex flex-col gap-3">
          <div className="hidden sm:block h-4 w-32 bg-[#e8e8e8] rounded-full" />
          <div className="-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-0 sm:border sm:border-[#f0f0f0] px-1 py-3 sm:p-6">
            <div className="flex items-start justify-between">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-[#e0e0e0]" />
                  <div className="h-2.5 w-14 bg-[#e8e8e8] rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal info + Order summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <div className="h-full rounded-2xl p-5 border border-[#f0f0f0] bg-[#F8F8F8] flex flex-col gap-3">
            <div className="h-3 w-24 bg-[#e0e0e0] rounded-full" />
            <div className="h-3.5 w-32 bg-[#e8e8e8] rounded-full" />
            <div className="h-3.5 w-40 bg-[#e8e8e8] rounded-full" />
            <div className="h-3.5 w-28 bg-[#e8e8e8] rounded-full" />
          </div>
          <div className="h-full rounded-2xl p-5 border border-[#f0f0f0] bg-[#F8F8F8] flex flex-col gap-3">
            <div className="h-3 w-24 bg-[#e0e0e0] rounded-full" />
            <div className="flex justify-between">
              <div className="h-3.5 w-16 bg-[#e8e8e8] rounded-full" />
              <div className="h-3.5 w-12 bg-[#e8e8e8] rounded-full" />
            </div>
            <div className="flex justify-between pb-3 border-b border-[#e8e8e8]">
              <div className="h-3.5 w-16 bg-[#e8e8e8] rounded-full" />
              <div className="h-3.5 w-12 bg-[#e8e8e8] rounded-full" />
            </div>
            <div className="flex justify-between">
              <div className="h-3.5 w-20 bg-[#e8e8e8] rounded-full" />
              <div className="h-3.5 w-14 bg-[#e8e8e8] rounded-full" />
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="rounded-2xl border border-[#f0f0f0] overflow-hidden">
          <OrderItemRowSkeleton />
          <OrderItemRowSkeleton />
        </div>

      </div>
    </main>
  );
}
