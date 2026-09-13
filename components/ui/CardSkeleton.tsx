export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Image area */}
      <div className="w-full h-[190px] md:h-[330px] bg-surface" />

      {/* Info area */}
      <div className="pt-3 flex flex-col gap-2">

        {/* Skeleton name line — shorter */}
        <div
          className="h-[11px] w-2/5 rounded"
          style={{ backgroundColor: '#E0E0E0' }}
        />

        {/* Skeleton price line — longer */}
        <div
          className="h-[14px] w-1/3 rounded"
          style={{ backgroundColor: '#E0E0E0' }}
        />

      </div>
    </div>
  );
}
