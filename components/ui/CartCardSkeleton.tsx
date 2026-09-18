function CartItemSkeleton() {
  return (
    <div className="flex items-start gap-4 sm:gap-5 py-6 border-b border-line">
      <div className="w-[100px] h-[120px] sm:w-[130px] sm:h-[130px] flex-shrink-0 rounded-xl bg-surface" />

      <div className="flex-1 flex flex-col gap-2.5">
        <div className="h-4 w-[60%] bg-line/60" />
        <div className="h-3 w-[35%] bg-line/60" />
        <div className="h-3.5 w-[25%] bg-line/60" />
        <div className="h-9 w-[90px] bg-line/60 mt-1" />
      </div>

      <div className="w-4 h-4 flex-shrink-0 self-start mt-1 bg-line/60" />
    </div>
  );
}

export default function CartPageSkeleton() {
  return (
    <div className="w-full bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24 animate-pulse">

      <div className="h-7 w-40 bg-line/60 mb-8" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">

        <div className="flex-1 w-full flex flex-col">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>

        <div className="w-full lg:w-[300px] xl:w-[390px] flex-shrink-0">
          <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4">
            <div className="h-3 w-32 bg-line/60" />
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-20 bg-line/60" />
              <div className="h-4 w-14 bg-line/60" />
            </div>
            <div className="h-3 w-[90%] bg-line/60 border-t border-line pt-4" />
            <div className="h-12 w-full bg-line/60" />
          </div>
        </div>

      </div>
    </div>
  );
}
