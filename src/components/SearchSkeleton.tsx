// Skeleton Loader Component
function SearchSkeleton() {
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-6">
      {/* Search Results Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="w-32 h-6 bg-muted rounded animate-pulse"></div>
          <div className="w-48 h-4 bg-muted/60 rounded animate-pulse"></div>
        </div>
        <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletonItems.map((index) => (
          <div key={index} className="space-y-3">
            {/* Video Thumbnail Skeleton */}
            <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60 animate-pulse">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              {/* Play button skeleton */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-muted-foreground/20 rounded-full animate-pulse"></div>
              </div>
              {/* Stats skeleton */}
              <div className="absolute bottom-2 left-2 right-2 space-y-1">
                <div className="w-8 h-3 bg-background/80 rounded animate-pulse"></div>
                <div className="w-12 h-3 bg-background/60 rounded animate-pulse"></div>
              </div>
            </div>
            {/* Title and User Skeleton */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full animate-pulse"></div>
                <div className="w-20 h-3 bg-muted/60 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default SearchSkeleton;
