export default function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col animate-pulse"
      style={{ background: '#F8F8F8', borderRadius: '12px' }}
    >
      {/* Image area */}
      <div className="relative p-3">
 
        {/* Skeleton dot — top right */}
        <div
          className="absolute top-3 right-3 w-3 h-3 rounded-full"
          style={{ backgroundColor: '#E0E0E0' }}
        />
 
        {/* Skeleton image block */}
        <div
          className="w-full h-[200px] rounded-lg"
          style={{ backgroundColor: '#E0E0E0' }}
        />
      </div>
 
      {/* Info area */}
      <div className="px-3 pb-3 flex flex-col gap-2">
 
        {/* Skeleton price line — shorter */}
        <div
          className="h-[14px] w-1/3 rounded"
          style={{ backgroundColor: '#E0E0E0' }}
        />
 
        {/* Skeleton name line — longer */}
        <div
          className="h-[11px] w-2/3 rounded"
          style={{ backgroundColor: '#E0E0E0' }}
        />
 
      </div>
    </div>
  );
}
 