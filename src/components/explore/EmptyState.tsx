interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-muted-foreground mb-6">No verses match your filters</p>
      <button
        onClick={onClearFilters}
        className="px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyState;
