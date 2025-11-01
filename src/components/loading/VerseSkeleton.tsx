import { cn } from '../../lib/utils';

interface VerseSkeletonProps {
  count?: number;
}

const VerseSkeleton = ({ count = 1 }: VerseSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "mb-6 md:mb-8 overflow-hidden",
            "bg-card border border-vedic-accent",
            "text-card-foreground rounded-xl",
            "px-4 py-4 sm:px-6 md:px-8 md:py-6",
            "animate-pulse"
          )}
          aria-label="Loading verse..."
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="h-8 w-24 bg-vedic-ui/50 rounded-lg" />
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-vedic-ui/50 rounded-lg" />
              <div className="h-10 w-10 bg-vedic-ui/50 rounded-lg" />
            </div>
          </div>

          {/* Tabs skeleton */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <div className="h-10 w-24 bg-vedic-ui/50 rounded-lg" />
            <div className="h-10 w-20 bg-vedic-ui/50 rounded-lg" />
            <div className="h-10 w-28 bg-vedic-ui/50 rounded-lg" />
          </div>

          {/* Content skeleton */}
          <div className="mb-6 space-y-3">
            <div className="h-6 bg-vedic-ui/50 rounded w-full" />
            <div className="h-6 bg-vedic-ui/50 rounded w-5/6" />
            <div className="h-6 bg-vedic-ui/50 rounded w-4/6" />
          </div>

          {/* Metadata skeleton */}
          <div className="mt-6 pt-6 border-t border-vedic-accent/20">
            <div className="h-5 w-32 bg-vedic-ui/50 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-vedic-ui/50 rounded w-3/4" />
                <div className="h-4 bg-vedic-ui/50 rounded w-2/3" />
                <div className="h-4 bg-vedic-ui/50 rounded w-1/2" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-vedic-ui/50 rounded w-full" />
                <div className="h-4 bg-vedic-ui/50 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default VerseSkeleton;
