import { cn } from '../../lib/utils';

const FilterSkeleton = () => {
  return (
    <div
      className={cn(
        "mb-8 p-6 rounded-xl",
        "bg-card border border-vedic-accent",
        "animate-pulse"
      )}
      aria-label="Loading filters..."
    >
      {/* Search bar skeleton */}
      <div className="mb-4">
        <div className="h-12 bg-vedic-ui/50 rounded-lg w-full" />
      </div>

      {/* Filter chips skeleton */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="h-10 w-28 bg-vedic-ui/50 rounded-lg" />
        <div className="h-10 w-24 bg-vedic-ui/50 rounded-lg" />
        <div className="h-10 w-32 bg-vedic-ui/50 rounded-lg" />
        <div className="h-10 w-20 bg-vedic-ui/50 rounded-lg" />
        <div className="h-10 w-28 bg-vedic-ui/50 rounded-lg" />
      </div>

      {/* Active filters skeleton */}
      <div className="flex gap-2">
        <div className="h-8 w-36 bg-vedic-ui/50 rounded-lg" />
        <div className="h-8 w-24 bg-vedic-ui/50 rounded-lg" />
      </div>
    </div>
  );
};

export default FilterSkeleton;
