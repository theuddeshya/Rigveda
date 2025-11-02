import { BarChart2, Globe, Network, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TabNavigationProps {
  activeTab: 'analytics' | 'geography' | 'connections' | 'timeline';
  onTabChange: (tab: 'analytics' | 'geography' | 'connections' | 'timeline') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex flex-wrap gap-2 mb-8 border-b border-vedic-accent/20" role="tablist" aria-label="Discover insights tabs">
      <button
        onClick={() => onTabChange('analytics')}
        role="tab"
        aria-selected={activeTab === 'analytics'}
        aria-controls="analytics-panel"
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'analytics'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <BarChart2 size={20} aria-hidden="true" />
        Analytics
      </button>
      <button
        onClick={() => onTabChange('geography')}
        role="tab"
        aria-selected={activeTab === 'geography'}
        aria-controls="geography-panel"
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'geography'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Globe size={20} aria-hidden="true" />
        Geography
      </button>
      <button
        onClick={() => onTabChange('connections')}
        role="tab"
        aria-selected={activeTab === 'connections'}
        aria-controls="connections-panel"
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'connections'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Network size={20} aria-hidden="true" />
        Connections
      </button>
      <button
        onClick={() => onTabChange('timeline')}
        role="tab"
        aria-selected={activeTab === 'timeline'}
        aria-controls="timeline-panel"
        className={cn(
          "flex items-center gap-2 px-4 py-3 font-semibold transition-all duration-200",
          activeTab === 'timeline'
            ? 'border-b-2 border-accent text-accent'
            : 'text-muted-foreground hover:text-vedic-text'
        )}
      >
        <Clock size={20} aria-hidden="true" />
        Timeline
      </button>
    </nav>
  );
};

export default TabNavigation;
