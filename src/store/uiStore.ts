import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UIStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Theme
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set, get) => {
  // determine initial theme: localStorage -> default 'dark'
  const saved = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null;
  const initialTheme: Theme = saved ? saved : 'dark';

  // ensure document class matches initial theme
  if (typeof document !== 'undefined') {
  // We use a `.light` class to enable the light theme overrides; dark is the default
  document.documentElement.classList.toggle('light', initialTheme === 'light');
    // Also expose current theme and a data attribute for easier debugging in devtools
    document.documentElement.setAttribute('data-theme', initialTheme);
  // quick debug trace
  console.debug('[uiStore] initialTheme:', initialTheme, 'document.classList:', document.documentElement.className);
  }

  return {
    sidebarOpen: false,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    filtersOpen: false,
    setFiltersOpen: (open) => set({ filtersOpen: open }),
    modalOpen: false,
    setModalOpen: (open) => set({ modalOpen: open }),
    loading: false,
    setLoading: (loading) => set({ loading }),

    theme: initialTheme,
    setTheme: (t: Theme) => {
      set({ theme: t });
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', t);
  // Toggle the `.light` class when switching to light mode; remove it for dark mode
  document.documentElement.classList.toggle('light', t === 'light');
  document.documentElement.setAttribute('data-theme', t);
  console.debug('[uiStore] setTheme ->', t, 'classList:', document.documentElement.className);
      }
    },
    toggleTheme: () => {
      const next = get().theme === 'dark' ? 'light' : 'dark';
      get().setTheme(next);
    },
  };
});
