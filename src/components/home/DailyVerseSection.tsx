import DailyVerseCard from '../verses/DailyVerseCard';
import VerseSkeleton from '../loading/VerseSkeleton';
import VerseErrorBoundary from '../error/VerseErrorBoundary';

interface DailyVerseSectionProps {
  loading: boolean;
}

const DailyVerseSection = ({ loading }: DailyVerseSectionProps) => {
  return (
    <section className="flex flex-col items-center pt-4 sm:pt-6 pb-10 sm:pb-12 px-4 max-w-4xl mx-auto">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-vedic-text">Daily Verse</h3>
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
