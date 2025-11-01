const LoadingState = () => {
  return (
    <div className="text-center text-xl py-8 text-vedic-text">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <p className="mt-4">Loading verses...</p>
    </div>
  );
};

export default LoadingState;
