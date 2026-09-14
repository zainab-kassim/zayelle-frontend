interface ProductCardSkeletonProps {
  heightClassName?: string;
}

export default function ProductCardSkeleton({ heightClassName = "h-[190px] md:h-[330px]" }: ProductCardSkeletonProps) {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Image area */}
      <div className={`w-full bg-surface ${heightClassName}`} />

      {/* Info area */}
      <div className="pt-3 flex flex-col gap-2">

        {/* Skeleton name line — shorter */}
        <div className="h-[11px] w-2/5 rounded bg-line" />

        {/* Skeleton price line — longer */}
        <div className="h-[14px] w-1/3 rounded bg-line" />

      </div>
    </div>
  );
}
