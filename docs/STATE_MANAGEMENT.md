# State Management Guide

This document describes the state management architecture used in the Rigveda Explorer application.

## Overview

We use **Zustand** for state management, a lightweight alternative to Redux that provides:
- Simple, minimal API
- TypeScript-first design
- Built-in devtools support
- Persistence capabilities
- No boilerplate required

## Store Architecture

### Store Structure

```
src/store/
├── verseStore.ts      # Verse data and featured verse
├── uiStore.ts         # UI state (sidebar, modals, theme)
└── userStore.ts       # User preferences and settings
```

### 1. Verse Store (`verseStore.ts`)

**Purpose:** Manages all verse-related data including the main verses array, featured verse, and filtered results.

**State:**
```typescript
interface VerseStore {
  verses: VerseData[];           // All loaded verses
  featuredVerse: VerseData | null;  // Daily/featured verse
  filteredVerses: VerseData[];   // Currently filtered/search results
}
```

**Actions:**
- `setVerses(verses)` - Load all verses
- `setFeaturedVerse(verse)` - Set the featured/daily verse
- `setFilteredVerses(verses)` - Update filtered results
- `clearVerses()` - Clear all verse data

**Middleware:** Devtools (for debugging)

**Usage Example:**
```typescript
import { useVerseStore } from '../store/verseStore';

function MyComponent() {
  const verses = useVerseStore((state) => state.verses);
  const setVerses = useVerseStore((state) => state.setVerses);

  // Load verses
  useEffect(() => {
    loadVerses().then(setVerses);
  }, []);
}
```

---

### 2. UI Store (`uiStore.ts`)

**Purpose:** Manages UI-specific state like sidebar visibility, modal states, and theme preferences.

**State:**
```typescript
interface UIStore {
  sidebarOpen: boolean;   // Sidebar visibility
  filtersOpen: boolean;   // Filter panel visibility
  modalOpen: boolean;     // Modal visibility
  loading: boolean;       // Global loading state
  theme: 'light' | 'dark'; // Current theme
}
```

**Actions:**
- `setSidebarOpen(open)` - Set sidebar visibility
- `toggleSidebar()` - Toggle sidebar
- `setFiltersOpen(open)` - Set filter panel visibility
- `setModalOpen(open)` - Set modal visibility
- `setLoading(loading)` - Set loading state
- `setTheme(theme)` - Set theme (persisted)
- `toggleTheme()` - Toggle between light/dark

**Middleware:**
- **Devtools** - For debugging
- **Persist** - Theme preference is saved to localStorage

**Theme Persistence:**
The theme is automatically persisted to localStorage under the key `rv-ui-store`. When the app loads, the theme is rehydrated and automatically applied to the document.

**Usage Example:**
```typescript
import { useUIStore } from '../store/uiStore';

function ThemeToggle() {
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

---

### 3. User Store (`userStore.ts`)

**Purpose:** Manages user preferences for reading experience (font size, translation, audio settings, etc.).

**State:**
```typescript
interface UserPrefs {
  defaultScript: 'devanagari' | 'iast' | 'both';
  translation: 'Griffith' | 'Jamison-Brereton' | 'Wilson';
  fontSize: number;
  lineSpacing: number;
  readingMode: 'scroll' | 'card' | 'parallel';
  colorScheme: string;
  animationSpeed: number;
  reducedMotion: boolean;
  audioAutoPlay: boolean;
  audioSpeed: number;
  audioVolume: number;
}
```

**Actions:**
- `setPref(key, value)` - Set a single preference
- `setMulti(prefs)` - Set multiple preferences at once
- `resetPrefs()` - Reset all preferences to defaults

**Middleware:**
- **Devtools** - For debugging
- **Persist** - All preferences are saved to localStorage

**Persistence:**
All user preferences are automatically persisted to localStorage under the key `rv-user-prefs`. They are restored when the app loads.

**Usage Example:**
```typescript
import { useUserStore } from '../store/userStore';

function FontSizeControl() {
  const fontSize = useUserStore((state) => state.fontSize);
  const setPref = useUserStore((state) => state.setPref);

  return (
    <input
      type="range"
      min={12}
      max={32}
      value={fontSize}
      onChange={(e) => setPref('fontSize', Number(e.target.value))}
    />
  );
}
```

---

## Best Practices

### 1. Selective Subscriptions

**❌ Bad:** Subscribing to entire store
```typescript
const store = useVerseStore(); // Re-renders on ANY state change
```

**✅ Good:** Subscribe only to what you need
```typescript
const verses = useVerseStore((state) => state.verses); // Only re-renders when verses change
```

### 2. Multiple Selectors

**❌ Bad:** Multiple subscriptions in one component
```typescript
const verses = useVerseStore((state) => state.verses);
const featuredVerse = useVerseStore((state) => state.featuredVerse);
const setVerses = useVerseStore((state) => state.setVerses);
```

**✅ Good:** Combine related selectors
```typescript
const { verses, featuredVerse, setVerses } = useVerseStore((state) => ({
  verses: state.verses,
  featuredVerse: state.featuredVerse,
  setVerses: state.setVerses,
}));
```

### 3. Computed Values

**❌ Bad:** Computing in component
```typescript
const verses = useVerseStore((state) => state.verses);
const verseCount = verses.length; // Recomputes on every render
```

**✅ Good:** Use useMemo or selector
```typescript
const verseCount = useVerseStore((state) => state.verses.length);
```

### 4. Actions Outside Components

You can access store actions outside React components:

```typescript
import { useVerseStore } from './store/verseStore';

export async function loadInitialData() {
  const verses = await fetchVerses();
  useVerseStore.getState().setVerses(verses);
}
```

---

## Devtools Integration

All stores are configured with Zustand devtools middleware. To use:

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
2. Open browser DevTools
3. Navigate to "Redux" tab
4. Select the store you want to inspect:
   - "Verse Store"
   - "UI Store"
   - "User Preferences"

**Features:**
- Time-travel debugging
- Action history
- State snapshots
- Action replay

**Action Names:**
All actions are named for easy debugging (e.g., `setVerses`, `setPref:fontSize`, `toggleTheme`)

---

## Persistence

### What is Persisted?

| Store | Persisted Fields | Storage Key |
|-------|-----------------|-------------|
| verseStore | None | N/A |
| uiStore | `theme` only | `rv-ui-store` |
| userStore | All preferences | `rv-user-prefs` |

### Why Not Persist Verses?

Verse data is NOT persisted because:
1. Large data size (10,000+ verses)
2. Data changes with updates
3. Better handled by proper caching strategies (future: React Query)

### Clearing Persisted Data

```javascript
// Clear theme
localStorage.removeItem('rv-ui-store');

// Clear user preferences
localStorage.removeItem('rv-user-prefs');

// Or clear everything
localStorage.clear();
```

---

## TypeScript Support

All stores are fully typed. TypeScript will:
- Auto-complete state fields and actions
- Prevent typos in selector functions
- Enforce correct action parameters
- Provide type safety across the entire app

**Example:**
```typescript
// ✅ TypeScript knows setPref accepts valid keys
setPref('fontSize', 20); // OK
setPref('invalidKey', 20); // ❌ Error

// ✅ TypeScript enforces correct value types
setPref('fontSize', 20); // OK
setPref('fontSize', '20'); // ❌ Error
```

---

## Performance Considerations

### Optimization Tips

1. **Use Shallow Equality for Objects:**
```typescript
import { shallow } from 'zustand/shallow';

const { verses, featuredVerse } = useVerseStore(
  (state) => ({ verses: state.verses, featuredVerse: state.featuredVerse }),
  shallow
);
```

2. **Memoize Complex Selectors:**
```typescript
const filteredVerses = useVerseStore(
  useCallback((state) =>
    state.verses.filter(v => v.mandala === 1),
    []
  )
);
```

3. **Split Large State:**
If a store grows too large, consider splitting it into multiple stores.

---

## Migration Notes

### From Previous Version

If upgrading from an older version:

1. **Theme Storage Key Changed:**
   - Old: `theme`
   - New: `rv-ui-store`
   - Users will need to re-select their theme (one-time)

2. **User Preferences Key Changed:**
   - Old: `rv-user-prefs` (same)
   - Structure: Compatible, no migration needed

3. **New Actions:**
   - `resetPrefs()` - Reset user preferences
   - `clearVerses()` - Clear all verse data

---

## Future Enhancements

Planned improvements:

1. **React Query Integration** (Phase 5)
   - Move verse data fetching to React Query
   - Keep store for global UI state only
   - Better cache invalidation

2. **Bookmark Store** (Future)
   - Separate store for bookmarks
   - Persist to localStorage
   - Sync across devices (future)

3. **Filter Store** (Future)
   - Dedicated store for filter state
   - Persist active filters
   - URL sync for shareable filters

---

## Troubleshooting

### Store Not Updating

**Problem:** State changes but component doesn't re-render

**Solution:** Make sure you're selecting state correctly:
```typescript
// ❌ Wrong - this doesn't subscribe to anything
const store = useVerseStore.getState();

// ✅ Correct - this subscribes to changes
const verses = useVerseStore((state) => state.verses);
```

### Persistence Not Working

**Problem:** Theme/preferences not persisting

**Solution:** Check:
1. localStorage is enabled in browser
2. Not in incognito/private mode
3. Storage quota not exceeded
4. Check browser console for errors

### Devtools Not Showing

**Problem:** Can't see stores in Redux DevTools

**Solution:**
1. Install Redux DevTools Extension
2. Refresh the page
3. Open DevTools BEFORE loading the app
4. Check "Redux" tab (not "React")

---

**Last Updated:** 2025-11-02
**Version:** 1.0
**Maintained By:** Development Team
