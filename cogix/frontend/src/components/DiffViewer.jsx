import { DiffEditor } from '@monaco-editor/react';

function DiffViewer({ original, optimized, language }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-medium text-cogix-muted uppercase tracking-wider">Original</span>
        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Optimized</span>
      </div>
      <div className="border border-cogix-border rounded-lg overflow-hidden">
        <DiffEditor
          height="400px"
          original={original}
          modified={optimized}
          language={language}
          theme="vs-dark"
          options={{
            readOnly: true,
            renderSideBySide: true,
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            padding: { top: 8 },
          }}
        />
      </div>
    </div>
  );
}

export default DiffViewer;
