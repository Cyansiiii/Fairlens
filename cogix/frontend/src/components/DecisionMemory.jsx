import { useState, useMemo } from 'react';

const TYPE_COLORS = {
  performance: { bg: 'bg-green-600/15', border: 'border-green-500/30', text: 'text-green-400' },
  architecture: { bg: 'bg-blue-600/15', border: 'border-blue-500/30', text: 'text-blue-400' },
  security: { bg: 'bg-red-600/15', border: 'border-red-500/30', text: 'text-red-400' },
  readability: { bg: 'bg-gray-600/15', border: 'border-gray-500/30', text: 'text-gray-400' },
  bugfix: { bg: 'bg-orange-600/15', border: 'border-orange-500/30', text: 'text-orange-400' },
};

function DecisionCard({ decision }) {
  const typeStyle = TYPE_COLORS[decision.type] || TYPE_COLORS.readability;

  const formattedTime = decision.timestamp
    ? new Date(decision.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="decision-card shrink-0 w-72 p-4 bg-cogix-card border border-cogix-border rounded-xl flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-2 py-0.5 rounded-md font-medium border ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text}`}
        >
          {decision.type}
        </span>
        <span className="text-xs text-cogix-muted font-mono">{decision.fileName}</span>
      </div>
      <p className="text-sm text-cogix-text font-semibold leading-snug">{decision.decision}</p>
      <p className="text-xs text-cogix-muted leading-relaxed">{decision.reason}</p>
      {decision.lineHint && (
        <p className="text-xs text-cogix-muted/60 font-mono truncate">📍 {decision.lineHint}</p>
      )}
      <div className="flex justify-end mt-auto">
        <span className="text-[10px] text-cogix-muted/50">{formattedTime}</span>
      </div>
    </div>
  );
}

function DecisionMemory({ decisions, isVisible }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDecisions = useMemo(() => {
    if (!decisions || decisions.length === 0) return [];
    if (!searchQuery.trim()) return decisions;

    const query = searchQuery.toLowerCase();
    return decisions.filter(
      (d) =>
        d.decision?.toLowerCase().includes(query) ||
        d.reason?.toLowerCase().includes(query) ||
        d.type?.toLowerCase().includes(query) ||
        d.fileName?.toLowerCase().includes(query)
    );
  }, [decisions, searchQuery]);

  if (!isVisible) return null;

  return (
    <div className="h-[200px] bg-cogix-sidebar border-t border-cogix-border flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-cogix-border shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">💾</span>
          <h3 className="text-sm font-semibold text-cogix-text">Decision Memory</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-600/20 border border-amber-500/30 text-amber-400 font-medium">
            {decisions.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search decisions..."
            className="w-48 bg-cogix-card border border-cogix-border rounded-md px-2 py-1 text-xs text-cogix-text placeholder-cogix-muted focus:outline-none focus:border-cogix-accent transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-3">
        {filteredDecisions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-cogix-muted text-sm">
            {decisions.length === 0
              ? 'No decisions recorded yet. Save files to extract decisions automatically.'
              : 'No decisions match your search.'}
          </div>
        ) : (
          <div className="flex gap-3 h-full">
            {filteredDecisions.map((decision, i) => (
              <DecisionCard key={decision.id || i} decision={decision} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DecisionMemory;
