import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { cn } from '../../lib/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-vedic-bg p-4">
          <div className={cn(
            "max-w-md w-full p-6 rounded-xl",
            "bg-card border border-vedic-accent",
            "text-center"
          )}>
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-vedic-text mb-4">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Please try again.
            </p>
            <div className="mb-6 p-4 bg-vedic-ui/50 rounded-lg text-left">
              <p className="text-sm font-mono text-foreground break-words">
                {this.state.error.message}
              </p>
            </div>
            <button
              onClick={this.resetError}
              className={cn(
                "px-6 py-3 rounded-lg font-medium",
                "bg-accent text-accent-foreground",
                "hover:bg-accent/90 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
