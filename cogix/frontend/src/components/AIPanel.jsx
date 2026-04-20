import DiffViewer from './DiffViewer';

function AIPanel({ content, onAcceptOptimization, onRejectOptimization }) {
  if (!content || content.type === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-4">
          <span className="text-2xl">🤖</span>
        </div>
        <h3 className="text-sm font-semibold text-cogix-text mb-2">AI Features Ready</h3>
        <p className="text-xs text-cogix-muted leading-relaxed max-w-[250px]">
          Select a file and use the toolbar to optimize, explain, or explore decisions.
        </p>
        <div className="mt-6 space-y-2 w-full max-w-[250px]">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cogix-card border border-cogix-border">
            <span className="text-sm">🎯</span>
            <span className="text-xs text-cogix-muted">Optimize — improve performance</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cogix-card border border-cogix-border">
            <span className="text-sm">🗺</span>
            <span className="text-xs text-cogix-muted">Explain — visualize architecture</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-cogix-card border border-cogix-border">
            <span className="text-sm">💾</span>
            <span className="text-xs text-cogix-muted">Memory — track decisions</span>
          </div>
        </div>
      </div>
    );
  }

  if (content.type === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-cogix-border border-t-cogix-accent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg pulse-glow">✨</span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-cogix-text mb-1">Gemini is analyzing...</h3>
        <p className="text-xs text-cogix-muted">This may take a few seconds</p>
      </div>
    );
  }

  if (content.type === 'optimization') {
    const { optimizedCode, changes, performanceGain, originalCode, language } = content.data;

    return (
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b border-cogix-border">
          <h3 className="text-sm font-semibold text-cogix-text flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Optimization Result
          </h3>
        </div>

        {/* Diff viewer */}
        <div className="p-4">
          <DiffViewer original={originalCode} optimized={optimizedCode} language={language} />
        </div>

        {/* Changes list */}
        <div className="px-4 pb-3">
          <h4 className="text-xs font-semibold text-cogix-muted uppercase tracking-wider mb-2">
            Changes Made
          </h4>
          <ul className="space-y-1">
            {changes.map((change, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-cogix-text">
                <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance gain */}
        {performanceGain && (
          <div className="px-4 pb-3">
            <div className="p-3 rounded-lg bg-green-600/10 border border-green-500/20">
              <h4 className="text-xs font-semibold text-green-400 mb-1">⚡ Performance</h4>
              <p className="text-xs text-green-300/80">{performanceGain}</p>
            </div>
          </div>
        )}

        {/* Accept / Reject */}
        <div className="p-4 border-t border-cogix-border mt-auto flex gap-2">
          <button
            onClick={onAcceptOptimization}
            className="flex-1 px-4 py-2 bg-cogix-success hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all"
          >
            ✓ Accept
          </button>
          <button
            onClick={onRejectOptimization}
            className="flex-1 px-4 py-2 bg-cogix-danger hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all"
          >
            ✗ Reject
          </button>
        </div>
      </div>
    );
  }

  if (content.type === 'error') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h3 className="text-sm font-semibold text-red-400 mb-2">Error</h3>
        <p className="text-xs text-cogix-muted max-w-[250px]">{content.data}</p>
      </div>
    );
  }

  if (content.type === 'info') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h3 className="text-sm font-semibold text-cogix-text mb-2">{content.data}</h3>
      </div>
    );
  }

  return null;
}

export default AIPanel;
