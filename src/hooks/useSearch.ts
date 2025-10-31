import { useState, useEffect, useMemo, useCallback } from 'react';
import { createSearchEngine } from '../utils/searchEngine';
import type { VerseData } from '../store/verseStore';

const SEARCH_HISTORY_KEY = 'rigveda_search_history';
const MAX_HISTORY_ITEMS = 5;

export const useSearch = (allVerses: VerseData[]) => {
  const [query, setQueryState] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load search history from localStorage", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save search history to localStorage", error);
    }
  }, [history]);

  const searchEngine = useMemo(() => {
    return createSearchEngine(allVerses);
  }, [allVerses]);

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery) {
      return [];
    }
    return searchEngine.search(searchQuery).map(result => result.item);
  }, [searchEngine]);

  const results = useMemo(() => {
    return performSearch(query);
  }, [query, performSearch]);

  const addHistoryItem = useCallback((item: string) => {
    setHistory(prevHistory => {
      const newHistory = [item, ...prevHistory.filter(h => h !== item)];
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error("Failed to clear search history from localStorage", error);
    }
  }, []);

  // Custom setQuery function to handle history
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(prevQuery => {
      if (newQuery.trim() !== '' && newQuery !== prevQuery) {
        addHistoryItem(newQuery);
      }
      return newQuery;
    });
  }, [addHistoryItem]); // addHistoryItem is stable due to useCallback

  return { query, setQuery, results, history, clearHistory };
};
