import { useState } from 'react';

function Toolbar({
  projectPath,
  onProjectPathChange,
  onLoadProject,
  onOptimizeFile,
  onExplainCodebase,
  onToggleMemory,
  showDecisionMemory,
  isProjectLoaded,
  isOptimizing,
  isExplaining,
}) {
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  const handleLoadProject = async () => {
    if (!projectPath.trim()) return;
    setIsLoadingProject(true);
    await onLoadProject(projectPath.trim());
    setIsLoadingProject(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLoadProject();
    }
  };

  return (
    <div className="flex items-center justify-between h-12 px-4 bg-cogix-toolbar border-b border-cogix-border shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
          ⚡ Cogix
        </span>
      </div>

      {/* Middle: Project path input */}
      <div className="flex items-center gap-2 flex-1 max-w-2xl mx-6">
        <input
          type="text"
          value={projectPath}
          onChange={(e) => onProjectPathChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter absolute project path (e.g., /Users/you/project)"
          className="flex-1 bg-cogix-card border border-cogix-border rounded-lg px-3 py-1.5 text-sm text-cogix-text placeholder-cogix-muted focus:outline-none focus:border-cogix-accent focus:ring-1 focus:ring-cogix-accent/30 transition-all"
        />
        <button
          onClick={handleLoadProject}
          disabled={isLoadingProject || !projectPath.trim()}
          className="px-4 py-1.5 bg-cogix-accent hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
        >
          {isLoadingProject ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </>
          ) : (
            'Load Project'
          )}
        </button>
      </div>

      {/* Right: Feature buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOptimizeFile}
          disabled={!isProjectLoaded || isOptimizing}
          className="px-4 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-purple-300 text-sm font-medium rounded-lg transition-all flex items-center gap-2"
        >
          {isOptimizing ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Optimizing...
            </>
          ) : (
            '🎯 Optimize File'
          )}
        </button>

        <button
          onClick={onExplainCodebase}
          disabled={!isProjectLoaded || isExplaining}
          className="px-4 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-blue-300 text-sm font-medium rounded-lg transition-all flex items-center gap-2"
        >
          {isExplaining ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            '🗺 Explain Codebase'
          )}
        </button>

        <button
          onClick={onToggleMemory}
          disabled={!isProjectLoaded}
          className={`px-4 py-1.5 border text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
            showDecisionMemory
              ? 'bg-amber-600/30 border-amber-500/50 text-amber-300'
              : 'bg-amber-600/20 hover:bg-amber-600/40 border-amber-500/30 text-amber-300'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          💾 Memory
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
