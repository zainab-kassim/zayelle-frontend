// components/cart/CartPageSkeleton.tsx

function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4 py-5 border-b border-[#f0f0f0]">
      {/* Image */}
      <div className="w-[110px] h-[130px] flex-shrink-0 rounded-xl bg-[#efefef]" />

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2.5">
        <div className="h-3.5 w-[60%] bg-[#e8e8e8] rounded-full" />
        <div className="h-3 w-[35%] bg-[#f0f0f0] rounded-full" />
        <div className="h-3.5 w-[25%] bg-[#e8e8e8] rounded-full" />
        <div className="h-8 w-[90px] bg-[#f0f0f0] rounded-md mt-1" />
      </div>

      {/* Delete */}
      <div className="w-4 h-4 flex-shrink-0 self-start mt-1 bg-[#e8e8e8] rounded" />
    </div>
  );
}

export default function CartPageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-8 animate-pulse">

    
      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left — items */}
        <div className="flex-1 w-full flex flex-col">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
          <div className="flex items-center gap-4 py-5">
            <div className="w-[110px] h-[130px] flex-shrink-0 rounded-xl bg-[#efefef]" />
            <div className="flex-1 flex flex-col gap-2.5">
              <div className="h-3.5 w-[58%] bg-[#e8e8e8] rounded-full" />
              <div className="h-3 w-[28%] bg-[#f0f0f0] rounded-full" />
              <div className="h-3.5 w-[22%] bg-[#e8e8e8] rounded-full" />
              <div className="h-8 w-[90px] bg-[#f0f0f0] rounded-md mt-1" />
            </div>
            <div className="w-4 h-4 flex-shrink-0 self-start mt-1 bg-[#e8e8e8] rounded" />
          </div>
        </div>

        {/* Right — order summary */}
        <div className="w-full lg:w-[300px] xl:w-[390px] flex-shrink-0">
          <div className="rounded-xl p-5 flex flex-col gap-4 bg-[#F2F2F2]">
            <div className="h-4 w-32 bg-[#e0e0e0] rounded-full" />
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-20 bg-[#e0e0e0] rounded-full" />
              <div className="h-3.5 w-12 bg-[#e0e0e0] rounded-full" />
            </div>
            <div className="h-3 w-[90%] bg-[#ddd] rounded-full" />
            <div className="h-11 w-full bg-[#d0d0d0] rounded-md mt-1" />
          </div>
        </div>

      </div>
    </div>
  );
}