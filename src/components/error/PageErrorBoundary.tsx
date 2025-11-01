import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { cn } from '../../lib/utils';

interface PageErrorBoundaryProps {
  children: ReactNode;
}

const PageErrorBoundary = ({ children }: PageErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={(error, resetError) => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vedic-ui via-vedic-bg to-vedic-ui p-4">
          <div className={cn(
            "max-w-lg w-full p-8 rounded-xl",
            "bg-card border border-vedic-accent",
            "text-center"
          )}>
            <div className="text-7xl mb-6">🔥</div>
            <h1 className="text-3xl font-bold text-vedic-text mb-4">
              Page Error
            </h1>
            <p className="text-muted-foreground mb-6">
              This page encountered an unexpected error and couldn't be displayed.
            </p>
            <div className="mb-6 p-4 bg-vedic-ui/50 rounded-lg text-left">
              <p className="text-xs font-mono text-foreground break-words">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    Stack trace
                  </summary>
                  <pre className="mt-2 text-xs text-muted-foreground overflow-auto max-h-40">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetError}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium",
                  "bg-accent text-accent-foreground",
                  "hover:bg-accent/90 transition-colors"
                )}
              >
                Try Again
              </button>
              <Link
                to="/"
                className={cn(
                  "px-6 py-3 rounded-lg font-medium",
                  "bg-vedic-ui/50 text-foreground border border-vedic-accent/20",
                  "hover:bg-vedic-sage/20 transition-colors"
                )}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )}
      onError={(error, errorInfo) => {
        // Log to error reporting service in production
        console.error('Page error:', error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default PageErrorBoundary;
