import MandalaCard from './MandalaCard';
import mandalaInfo from '../../data/mandalaInfo.json';

const MandalaGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mandalaInfo.map(mandala => (
        <MandalaCard key={mandala.id} mandala={mandala} />
      ))}
    </div>
  );
};

export default MandalaGrid;
