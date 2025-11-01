import VerseCard from '../verses/VerseCard';
import EmptyState from './EmptyState';
import type { VerseData } from '../../store/verseStore';

interface VerseListProps {
  verses: VerseData[];
  sourceVerseCount: number;
  verseRefs: React.MutableRefObject<Array<HTMLDivElement | null>>;
  onFocusVerse: (index: number) => void;
  onClearFilters: () => void;
}

const VerseList = ({ verses, sourceVerseCount, verseRefs, onFocusVerse, onClearFilters }: VerseListProps) => {
  return (
    <>
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {verses.length} of {sourceVerseCount} verses
      </div>
      <div className="space-y-6">
        {verses.length > 0 ? (
          verses.map((verse: VerseData, index: number) => (
            <div
              key={verse.id}
              ref={(el) => { verseRefs.current[index] = el }}
              tabIndex={0}
              onFocus={() => onFocusVerse(index)}
            >
              <VerseCard
                verse={verse}
                viewMode="full"
                showContext
                showTranslation
                enableAudio={false}
                enableBookmark
              />
            </div>
          ))
        ) : (
          <EmptyState onClearFilters={onClearFilters} />
        )}
      </div>
    </>
  );
};

export default VerseList;
