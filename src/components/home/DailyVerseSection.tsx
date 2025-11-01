import DailyVerseCard from '../verses/DailyVerseCard';
import VerseSkeleton from '../loading/VerseSkeleton';
import VerseErrorBoundary from '../error/VerseErrorBoundary';

interface DailyVerseSectionProps {
  loading: boolean;
}

const DailyVerseSection = ({ loading }: DailyVerseSectionProps) => {
  return (
    <section className="flex flex-col items-center py-12 sm:py-16 px-4 max-w-4xl mx-auto">
      <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-vedic-text">Daily Verse</h3>
      {loading ? (
        <VerseSkeleton count={1} />
      ) : (
        <VerseErrorBoundary>
          <DailyVerseCard />
        </VerseErrorBoundary>
      )}
    </section>
  );
};

export default DailyVerseSection;
