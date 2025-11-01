import { BarChart2, Globe, Network, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TabNavigationProps {
  activeTab: 'analytics' | 'geography' | 'connections' | 'timeline';
  onTabChange: (tab: 'analytics' | 'geography' | 'connections' | 'timeline') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-vedic-accent/20">
      <button
        onClick={() => onTabChange('analytics')}
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'analytics'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <BarChart2 size={20} />
        Analytics
      </button>
      <button
        onClick={() => onTabChange('geography')}
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'geography'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Globe size={20} />
        Geography
      </button>
      <button
        onClick={() => onTabChange('connections')}
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'connections'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Network size={20} />
        Connections
      </button>
      <button
        onClick={() => onTabChange('timeline')}
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'timeline'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Clock size={20} />
        Timeline
      </button>
    </div>
  );
};

export default TabNavigation;
