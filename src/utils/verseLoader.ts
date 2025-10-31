import type { VerseData } from '../store/verseStore';

// Load verses from per-mandala JSON files if available, otherwise fall back
// to the legacy `/data/verses.json` file. Each mandala file may return either
// an array of verses or an object with a `verses` property.
export const loadVerses = async (): Promise<VerseData[]> => {
  const mandalaFiles = Array.from({ length: 10 }, (_, i) =>
    `/data/rigveda_mandalas/rigveda_mandala_${String(i + 1).padStart(2, '0')}.json`
  );

  try {
    // Try to fetch all mandala files in parallel. Use Promise.allSettled so one
    // failing file doesn't break the whole load.
    const settled = await Promise.allSettled(
      mandalaFiles.map((path) => fetch(path).then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch ${path}: ${r.status}`);
        return r.json();
      }))
    );

    const merged: VerseData[] = [];
    settled.forEach((res, idx) => {
      const path = mandalaFiles[idx];
      if (res.status === 'fulfilled') {
        const data = res.value;
        if (Array.isArray(data)) {
          merged.push(...data);
        } else if (Array.isArray(data.verses)) {
          merged.push(...data.verses);
        } else if (Array.isArray(data.data)) {
          // Some exports might use `data` key
          merged.push(...data.data);
        } else {
          console.warn(`Unrecognized structure in ${path}`, data);
        }
      } else {
        // Log but continue
        console.warn(`Could not load mandala file ${path}:`, res.reason);
      }
    });

    if (merged.length > 0) return merged;

    // Fallback to legacy single-file structure
    const fallbackResp = await fetch('/data/verses.json');
    if (!fallbackResp.ok) throw new Error('Failed to load fallback verses.json');
    const fallbackData = await fallbackResp.json();
    if (Array.isArray(fallbackData)) return fallbackData;
    if (Array.isArray(fallbackData.verses)) return fallbackData.verses;
    return [];
  } catch (error) {
    console.error('Error loading verses:', error);
    return [];
  }
};
