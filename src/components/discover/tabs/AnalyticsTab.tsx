interface AnalyticsTabProps {
  topDeities: [string, number][];
  topThemes: [string, number][];
  topMeters: [string, number][];
}

const AnalyticsTab = ({ topDeities, topThemes, topMeters }: AnalyticsTabProps) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Deities */}
        <div className="bg-card border border-vedic-accent/20 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-vedic-text">Top Deities</h3>
          <div className="space-y-3">
            {topDeities.map(([deity, count]) => {
              const maxCount = topDeities[0][1];
              const percentage = (count / maxCount) * 100;
              return (
                <div key={deity}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-foreground">{deity}</span>
                    <span className="text-sm text-muted-foreground">{count} verses</span>
                  </div>
                  <div className="w-full bg-vedic-ui rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Themes */}
        <div className="bg-card border border-vedic-accent/20 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-vedic-text">Common Themes</h3>
          <div className="flex flex-wrap gap-2">
            {topThemes.map(([theme, count]) => (
              <span
                key={theme}
                className="px-3 py-1.5 bg-accent/20 text-accent-foreground border border-accent/30 rounded-full text-sm font-medium"
                title={`${count} verses`}
              >
                {theme} <span className="text-xs opacity-75">({count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Meters */}
      <div className="bg-card border border-vedic-accent/20 rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-vedic-text">Top Meters</h3>
        <div className="space-y-3">
          {topMeters.map(([meter, count]) => {
            const maxCount = topMeters[0][1];
            const percentage = (count / maxCount) * 100;
            return (
              <div key={meter}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-foreground">{meter}</span>
                  <span className="text-sm text-muted-foreground">{count} verses</span>
                </div>
                <div className="w-full bg-vedic-ui rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
