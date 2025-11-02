import mandalaInfo from '../../data/mandalaInfo.json';

interface MandalaCardProps {
  mandala: typeof mandalaInfo[0];
}

const MandalaCard = ({ mandala }: MandalaCardProps) => (
  <article
    className="bg-vedic-ui/50 rounded-xl p-6 hover:bg-vedic-ui/70 transition-all duration-200 border border-vedic-ui/30 hover:border-accent/30"
    role="listitem"
    aria-label={`Mandala ${mandala.id}: ${mandala.name}`}
  >
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-xl font-bold text-vedic-text">Mandala {mandala.id}</h3>
      <span className="bg-accent/20 text-accent px-2 py-1 rounded text-sm" aria-label={`${mandala.verseCount} verses in total`}>
        {mandala.verseCount} verses
      </span>
    </div>
    <h4 className="text-lg font-semibold text-vedic-sage mb-2">{mandala.name}</h4>
    <p className="text-muted-foreground mb-3">{mandala.description}</p>
    <div className="flex items-center justify-between">
      <span className="text-sm text-vedic-text/80">Primary deity: {mandala.deity}</span>
      <button
        className="text-accent hover:text-accent/80 font-medium text-sm"
        aria-label={`Explore Mandala ${mandala.id}`}
      >
        Explore →
      </button>
    </div>
  </article>
);

export default MandalaCard;
