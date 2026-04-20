import { useState, useCallback, useEffect } from 'react';
import { getAllDecisions, saveDecisions as apiSaveDecisions } from '../api/client';

export function useDecisions() {
  const [decisions, setDecisions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchDecisions = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getAllDecisions();
      if (result.success) {
        setDecisions(result.decisions);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveNewDecisions = useCallback(async (filePath, newDecisions) => {
    if (!newDecisions || newDecisions.length === 0) return;
    const result = await apiSaveDecisions(filePath, newDecisions);
    if (result.success) {
      await fetchDecisions();
    }
    return result;
  }, [fetchDecisions]);

  const getAllDecisionsList = useCallback(() => {
    const list = [];
    for (const [filePath, fileDecisions] of Object.entries(decisions)) {
      for (const d of fileDecisions) {
        list.push({ ...d, filePath });
      }
    }
    list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return list;
  }, [decisions]);

  const getDecisionCount = useCallback(() => {
    return Object.values(decisions).reduce((sum, arr) => sum + arr.length, 0);
  }, [decisions]);

  useEffect(() => {
    fetchDecisions();
  }, [fetchDecisions]);

  return {
    decisions,
    isLoading,
    fetchDecisions,
    saveNewDecisions,
    getAllDecisionsList,
    getDecisionCount,
  };
}
