import { cn } from '../../lib/utils';

const PageSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-vedic-ui via-vedic-bg to-vedic-ui py-8 px-4 animate-pulse"
      aria-label="Loading page..."
    >
      <div className="max-w-6xl mx-auto">
        {/* Page title skeleton */}
        <div className="mb-8">
          <div className="h-12 w-64 bg-vedic-ui/50 rounded-lg mb-2" />
          <div className="h-6 w-96 bg-vedic-ui/50 rounded" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {/* Card skeleton */}
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "p-6 rounded-xl",
                "bg-card border border-vedic-accent"
              )}
            >
              <div className="h-8 w-48 bg-vedic-ui/50 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-vedic-ui/50 rounded w-full" />
                <div className="h-4 bg-vedic-ui/50 rounded w-5/6" />
                <div className="h-4 bg-vedic-ui/50 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
