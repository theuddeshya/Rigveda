import { useState, useEffect, useMemo, useCallback } from 'react';
import { createSearchEngine } from '../utils/searchEngine';
import type { VerseData } from '../store/verseStore';

const SEARCH_HISTORY_KEY = 'rigveda_search_history';
const MAX_HISTORY_ITEMS = 10;

export interface SearchSuggestion {
  type: 'history' | 'deity' | 'rishi' | 'meter' | 'theme';
  value: string;
  label: string;
}

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

  // Generate search suggestions based on query
  const suggestions = useMemo((): SearchSuggestion[] => {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // Add history suggestions
    history
      .filter(h => h.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach(h => {
        suggestions.push({ type: 'history', value: h, label: h });
      });

    // Extract unique deities, rishis, meters, and themes
    const deities = new Set<string>();
    const rishis = new Set<string>();
    const meters = new Set<string>();
    const themes = new Set<string>();

    allVerses.forEach(v => {
      if (v.metadata?.deity?.primary) deities.add(v.metadata.deity.primary);
      if (v.metadata?.rishi?.name) rishis.add(v.metadata.rishi.name);
      if (v.metadata?.meter) meters.add(v.metadata.meter);
      v.themes?.forEach(t => themes.add(t));
    });

    // Add deity suggestions
    Array.from(deities)
      .filter(d => d.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach(d => {
        suggestions.push({ type: 'deity', value: d, label: `Deity: ${d}` });
      });

    // Add rishi suggestions
    Array.from(rishis)
      .filter(r => r.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach(r => {
        suggestions.push({ type: 'rishi', value: r, label: `Rishi: ${r}` });
      });

    // Add meter suggestions
    Array.from(meters)
      .filter(m => m.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .forEach(m => {
        suggestions.push({ type: 'meter', value: m, label: `Meter: ${m}` });
      });

    // Add theme suggestions
    Array.from(themes)
      .filter(t => t.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .forEach(t => {
        suggestions.push({ type: 'theme', value: t, label: `Theme: ${t}` });
      });

    return suggestions.slice(0, 10); // Limit to 10 total suggestions
  }, [query, history, allVerses]);

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

  const removeHistoryItem = useCallback((item: string) => {
    setHistory(prevHistory => prevHistory.filter(h => h !== item));
  }, []);

  // Custom setQuery function to handle history
  const setQuery = useCallback((newQuery: string) => {
    setQueryState(prevQuery => {
      if (newQuery.trim() !== '' && newQuery !== prevQuery) {
        addHistoryItem(newQuery);
      }
      return newQuery;
    });
  }, [addHistoryItem]);

  return {
    query,
    setQuery,
    results,
    history,
    suggestions,
    clearHistory,
    removeHistoryItem,
  };
};
