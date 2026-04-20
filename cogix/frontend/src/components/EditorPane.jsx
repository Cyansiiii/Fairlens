import { useRef, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function EditorPane({ openFiles, activeFilePath, onFileChange, onFileSave, onTabClose }) {
  const editorRef = useRef(null);

  const activeFile = openFiles.find((f) => f.path === activeFilePath);

  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Register Ctrl+S / Cmd+S
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onFileSave();
    });
  }, [onFileSave]);

  const handleEditorChange = useCallback(
    (value) => {
      if (activeFilePath && value !== undefined) {
        onFileChange(activeFilePath, value);
      }
    },
    [activeFilePath, onFileChange]
  );

  useEffect(() => {
    if (editorRef.current && activeFile) {
      const model = editorRef.current.getModel();
      if (model && model.getValue() !== activeFile.content) {
        model.setValue(activeFile.content);
      }
    }
  }, [activeFilePath]);

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  if (openFiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-cogix-bg">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">⚡</div>
          <h2 className="text-xl font-semibold text-cogix-muted mb-2">Welcome to Cogix</h2>
          <p className="text-sm text-cogix-muted/60">Open a file from the sidebar to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-cogix-bg">
      {/* Tab bar */}
      <div className="flex items-center bg-cogix-toolbar border-b border-cogix-border overflow-x-auto shrink-0">
        {openFiles.map((file) => {
          const isActive = file.path === activeFilePath;
          const fileName = getFileName(file.path);
          return (
            <div
              key={file.path}
              className={`editor-tab flex items-center gap-1.5 px-3 py-2 text-sm cursor-pointer border-r border-cogix-border shrink-0 ${
                isActive
                  ? 'bg-cogix-bg text-cogix-text border-t-2 border-t-cogix-accent'
                  : 'bg-cogix-toolbar text-cogix-muted hover:bg-cogix-hover border-t-2 border-t-transparent'
              }`}
              onClick={() => {
                const ev = { path: file.path };
                onFileChange(file.path, file.content);
              }}
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(file.path);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-cogix-danger cursor-pointer"
              >
              </span>
              {file.isDirty && (
                <span className="w-2 h-2 rounded-full bg-cogix-accent shrink-0" />
              )}
              <span className="truncate max-w-[120px]">{fileName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(file.path);
                }}
                className="ml-1 text-cogix-muted hover:text-cogix-danger transition-colors text-xs"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Monaco Editor */}
      {activeFile && (
        <div className="flex-1">
          <Editor
            key={activeFilePath}
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            theme="vs-dark"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              tabSize: 2,
              renderWhitespace: 'selection',
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              padding: { top: 12 },
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontLigatures: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EditorPane;
