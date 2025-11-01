import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
  const parentRef = useRef<HTMLDivElement>(null);

  // Use virtualization only when we have many verses (> 20)
  const shouldVirtualize = verses.length > 20;

  const virtualizer = useVirtualizer({
    count: verses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300, // Estimated verse card height in pixels
    overscan: 3, // Render 3 extra items above/below viewport
    enabled: shouldVirtualize,
  });

  if (verses.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <>
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {verses.length} of {sourceVerseCount} verses
      </div>

      {shouldVirtualize ? (
        // Virtualized list for large datasets
        <div
          ref={parentRef}
          className="h-[calc(100vh-300px)] overflow-auto"
          style={{ contain: 'strict' }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const verse = verses[virtualRow.index];
              return (
                <div
                  key={verse.id}
                  ref={(el) => { verseRefs.current[virtualRow.index] = el }}
                  tabIndex={0}
                  onFocus={() => onFocusVerse(virtualRow.index)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="pb-6"
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
              );
            })}
          </div>
        </div>
      ) : (
        // Non-virtualized list for small datasets
        <div className="space-y-6">
          {verses.map((verse: VerseData, index: number) => (
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
          ))}
        </div>
      )}
    </>
  );
};

export default VerseList;
