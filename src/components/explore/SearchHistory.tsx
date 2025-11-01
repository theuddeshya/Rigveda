import { XCircle } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onHistoryClick: (item: string) => void;
  onClearHistory: () => void;
}

const SearchHistory = ({ history, onHistoryClick, onClearHistory }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-vedic-text">Recent Searches</h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-muted-foreground hover:text-vedic-text flex items-center gap-1"
        >
          <XCircle size={16} /> Clear History
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onHistoryClick(item)}
            className="px-4 py-2 rounded-full bg-vedic-ui/50 text-vedic-sage text-sm hover:bg-vedic-sage/20 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
