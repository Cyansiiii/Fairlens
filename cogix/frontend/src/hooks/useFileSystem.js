import { useState, useCallback } from 'react';
import { getFileTree as fetchFileTree, getFile, saveFile as apiSaveFile } from '../api/client';

export function useFileSystem() {
  const [fileTree, setFileTree] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFilePath, setActiveFilePath] = useState(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);

  const loadFileTree = useCallback(async (path) => {
    setIsLoadingTree(true);
    try {
      const result = await fetchFileTree(path);
      if (result.success) {
        setFileTree(result.tree);
      }
      return result;
    } finally {
      setIsLoadingTree(false);
    }
  }, []);

  const openFile = useCallback(async (filePath) => {
    const existing = openFiles.find((f) => f.path === filePath);
    if (existing) {
      setActiveFilePath(filePath);
      return;
    }

    const result = await getFile(filePath);
    if (result.success) {
      const newFile = {
        path: filePath,
        content: result.content,
        language: result.language,
        isDirty: false,
      };
      setOpenFiles((prev) => [...prev, newFile]);
      setActiveFilePath(filePath);
    }
    return result;
  }, [openFiles]);

  const updateFileContent = useCallback((path, newContent) => {
    setOpenFiles((prev) =>
      prev.map((f) =>
        f.path === path ? { ...f, content: newContent, isDirty: true } : f
      )
    );
  }, []);

  const saveCurrentFile = useCallback(async () => {
    const activeFile = openFiles.find((f) => f.path === activeFilePath);
    if (!activeFile) return null;

    const result = await apiSaveFile(activeFile.path, activeFile.content);
    if (result.success) {
      setOpenFiles((prev) =>
        prev.map((f) =>
          f.path === activeFilePath ? { ...f, isDirty: false } : f
        )
      );
    }
    return { ...result, file: activeFile };
  }, [openFiles, activeFilePath]);

  const closeFile = useCallback((filePath) => {
    setOpenFiles((prev) => {
      const filtered = prev.filter((f) => f.path !== filePath);
      if (activeFilePath === filePath) {
        const idx = prev.findIndex((f) => f.path === filePath);
        const nextActive = filtered[Math.min(idx, filtered.length - 1)]?.path || null;
        setActiveFilePath(nextActive);
      }
      return filtered;
    });
  }, [activeFilePath]);

  const getActiveFile = useCallback(() => {
    return openFiles.find((f) => f.path === activeFilePath) || null;
  }, [openFiles, activeFilePath]);

  return {
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
  };
}
