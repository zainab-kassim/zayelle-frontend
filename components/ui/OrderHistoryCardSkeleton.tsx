export default function OrderHistoryCardSkeleton() {
  return (
    <div className="flex items-center gap-4 sm:gap-6 py-5 border-b border-line last:border-0 animate-pulse">
      <div className="flex-shrink-0 w-[64px] h-[76px] sm:w-[72px] sm:h-[86px] rounded-lg bg-surface" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-3.5 w-28 bg-line/60" />
        <div className="h-3 w-36 bg-line/60" />
        <div className="h-2.5 w-24 bg-line/60" />
      </div>
      <div className="hidden sm:block h-3 w-16 bg-line/60" />
    </div>
  );
}
