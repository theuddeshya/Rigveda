import type { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { cn } from '../../lib/utils';

interface VerseErrorBoundaryProps {
  children: ReactNode;
}

const VerseErrorBoundary = ({ children }: VerseErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={(error, resetError) => (
        <div className={cn(
          "mb-6 md:mb-8 overflow-hidden",
          "bg-card border border-vedic-accent",
          "text-card-foreground rounded-xl",
          "px-4 py-4 sm:px-6 md:px-8 md:py-6",
          "text-center"
        )}>
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-vedic-text mb-2">
            Failed to load verse
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error.message}
          </p>
          <button
            onClick={resetError}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium",
              "bg-accent text-accent-foreground",
              "hover:bg-accent/90 transition-colors"
            )}
          >
            Retry
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default VerseErrorBoundary;
