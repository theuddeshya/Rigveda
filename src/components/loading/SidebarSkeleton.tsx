import { cn } from '../../lib/utils';

const SidebarSkeleton = () => {
  return (
    <div
      className={cn(
        "w-full h-full p-6",
        "bg-card",
        "animate-pulse"
      )}
      aria-label="Loading sidebar..."
    >
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="h-8 w-3/4 bg-vedic-ui/50 rounded mb-2" />
        <div className="h-4 w-1/2 bg-vedic-ui/50 rounded" />
      </div>

      {/* Navigation items skeleton */}
      <div className="space-y-3 mb-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="h-10 w-10 bg-vedic-ui/50 rounded-lg" />
            <div className="h-6 flex-1 bg-vedic-ui/50 rounded" />
          </div>
        ))}
      </div>

      {/* Section skeleton */}
      <div className="border-t border-vedic-accent/20 pt-6">
        <div className="h-6 w-32 bg-vedic-ui/50 rounded mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 bg-vedic-ui/50 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
