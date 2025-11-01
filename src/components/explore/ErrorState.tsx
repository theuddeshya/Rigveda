interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-500/30">
      Error: {error}
    </div>
  );
};

export default ErrorState;
