import { useState, useRef, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import FileTree from './components/FileTree';
import EditorPane from './components/EditorPane';
import AIPanel from './components/AIPanel';
import CodebaseGraph from './components/CodebaseGraph';
import DecisionMemory from './components/DecisionMemory';
import { useFileSystem } from './hooks/useFileSystem';
import { useDecisions } from './hooks/useDecisions';
import {
  optimizeCode as apiOptimizeCode,
  explainCodebase as apiExplainCodebase,
  extractDecisions as apiExtractDecisions,
  saveDecisions as apiSaveDecisions,
  saveFile as apiSaveFile,
} from './api/client';

function App() {
  const [projectPath, setProjectPath] = useState('');
  const [aiPanelContent, setAiPanelContent] = useState({ type: 'idle', data: null });
  const [showDecisionMemory, setShowDecisionMemory] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [graphSummary, setGraphSummary] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const originalCodeRef = useRef(null);

  const {
    fileTree,
    openFiles,
    activeFilePath,
    isLoadingTree,
    loadFileTree,
    openFile,
    updateFileContent,
    saveCurrentFile,
    closeFile,
    setActiveFilePath,
    getActiveFile,
  } = useFileSystem();

  const {
    fetchDecisions,
    saveNewDecisions,
    getAllDecisionsList,
    getDecisionCount,
  } = useDecisions();

  const isProjectLoaded = Boolean(fileTree);

  // --- Handlers ---

  const handleLoadProject = useCallback(async (path) => {
    const result = await loadFileTree(path);
    if (result.success) {
      setProjectPath(path);
      setAiPanelContent({ type: 'idle', data: null });
      await fetchDecisions();
    } else {
      setAiPanelContent({ type: 'error', data: result.error || 'Failed to load project' });
    }
  }, [loadFileTree, fetchDecisions]);

  const handleFileClick = useCallback(async (filePath) => {
    await openFile(filePath);
  }, [openFile]);

  const handleFileChange = useCallback((path, newContent) => {
    updateFileContent(path, newContent);
  }, [updateFileContent]);

  const handleFileSave = useCallback(async () => {
    const result = await saveCurrentFile();
    if (!result || !result.success) return;

    const activeFile = result.file;
    if (!activeFile) return;

    try {
      const fileName = activeFile.path.split('/').pop();
      const extractResult = await apiExtractDecisions(activeFile.content, fileName);

      if (extractResult.success && extractResult.decisions && extractResult.decisions.length > 0) {
        const relativePath = projectPath
          ? activeFile.path.replace(projectPath, '').replace(/^\//, '')
          : fileName;
        await saveNewDecisions(relativePath, extractResult.decisions);
      }
    } catch (err) {
      // Decision extraction is non-critical; don't block save
      console.warn('Decision extraction failed:', err);
    }
  }, [saveCurrentFile, projectPath, saveNewDecisions]);

  const handleOptimizeFile = useCallback(async () => {
    const activeFile = getActiveFile();
    if (!activeFile) {
      setAiPanelContent({ type: 'error', data: 'No file is currently open. Open a file first.' });
      return;
    }

    setIsOptimizing(true);
    setAiPanelContent({ type: 'loading', data: null });
    originalCodeRef.current = activeFile.content;

    try {
      const fileName = activeFile.path.split('/').pop();
      const result = await apiOptimizeCode(activeFile.content, activeFile.language, fileName);

      if (result.success) {
        setAiPanelContent({
          type: 'optimization',
          data: {
            optimizedCode: result.result.optimizedCode,
            changes: result.result.changes,
            performanceGain: result.result.performanceGain,
            originalCode: activeFile.content,
            language: activeFile.language,
          },
        });
      } else {
        setAiPanelContent({ type: 'error', data: result.error || 'Optimization failed' });
      }
    } catch (err) {
      setAiPanelContent({ type: 'error', data: err.message || 'Optimization failed' });
    } finally {
      setIsOptimizing(false);
    }
  }, [getActiveFile]);

  const handleAcceptOptimization = useCallback(async () => {
    if (!aiPanelContent.data?.optimizedCode || !activeFilePath) return;

    updateFileContent(activeFilePath, aiPanelContent.data.optimizedCode);

    // Auto-save
    await apiSaveFile(activeFilePath, aiPanelContent.data.optimizedCode);

    setAiPanelContent({ type: 'info', data: 'Optimization applied and saved!' });
    originalCodeRef.current = null;
  }, [aiPanelContent, activeFilePath, updateFileContent]);

  const handleRejectOptimization = useCallback(() => {
    if (originalCodeRef.current !== null && activeFilePath) {
      updateFileContent(activeFilePath, originalCodeRef.current);
    }
    setAiPanelContent({ type: 'info', data: 'Optimization rejected. Original code restored.' });
    originalCodeRef.current = null;
  }, [activeFilePath, updateFileContent]);

  const handleExplainCodebase = useCallback(async () => {
    if (!projectPath) {
      setAiPanelContent({ type: 'error', data: 'No project loaded. Load a project first.' });
      return;
    }

    setIsExplaining(true);
    setAiPanelContent({ type: 'loading', data: null });

    try {
      const result = await apiExplainCodebase(projectPath);

      if (result.success && result.graph) {
        setGraphData(result.graph);
        setGraphSummary(result.graph.projectSummary || '');
        setShowGraph(true);
        setAiPanelContent({ type: 'idle', data: null });
      } else {
        setAiPanelContent({ type: 'error', data: result.error || 'Failed to analyze codebase' });
      }
    } catch (err) {
      setAiPanelContent({ type: 'error', data: err.message || 'Failed to analyze codebase' });
    } finally {
      setIsExplaining(false);
    }
  }, [projectPath]);

  const handleToggleMemory = useCallback(() => {
    setShowDecisionMemory((prev) => !prev);
  }, []);

  const handleCloseGraph = useCallback(() => {
    setShowGraph(false);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-cogix-bg overflow-hidden">
      {/* Toolbar */}
      <Toolbar
        projectPath={projectPath}
        onProjectPathChange={setProjectPath}
        onLoadProject={handleLoadProject}
        onOptimizeFile={handleOptimizeFile}
        onExplainCodebase={handleExplainCodebase}
        onToggleMemory={handleToggleMemory}
        showDecisionMemory={showDecisionMemory}
        isProjectLoaded={isProjectLoaded}
        isOptimizing={isOptimizing}
        isExplaining={isExplaining}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Tree Sidebar */}
        <div className="w-[250px] shrink-0 bg-cogix-sidebar border-r border-cogix-border overflow-hidden">
          {isLoadingTree ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-cogix-border border-t-cogix-accent animate-spin" />
                <span className="text-xs text-cogix-muted">Loading project...</span>
              </div>
            </div>
          ) : (
            <FileTree
              tree={fileTree}
              onFileClick={handleFileClick}
              activeFilePath={activeFilePath}
            />
          )}
        </div>

        {/* Editor (flexible width) */}
        <div className="flex-1 overflow-hidden">
          <EditorPane
            openFiles={openFiles}
            activeFilePath={activeFilePath}
            onFileChange={handleFileChange}
            onFileSave={handleFileSave}
            onTabClose={closeFile}
          />
        </div>

        {/* AI Panel */}
        <div className="w-[350px] shrink-0 bg-cogix-sidebar border-l border-cogix-border overflow-hidden">
          <AIPanel
            content={aiPanelContent}
            onAcceptOptimization={handleAcceptOptimization}
            onRejectOptimization={handleRejectOptimization}
          />
        </div>
      </div>

      {/* Decision Memory (collapsible bottom panel) */}
      <DecisionMemory
        decisions={getAllDecisionsList()}
        isVisible={showDecisionMemory}
      />

      {/* Codebase Graph Modal */}
      {showGraph && graphData && (
        <CodebaseGraph
          graph={graphData}
          projectSummary={graphSummary}
          onClose={handleCloseGraph}
        />
      )}
    </div>
  );
}

export default App;
