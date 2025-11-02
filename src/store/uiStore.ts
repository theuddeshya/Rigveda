import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

// Helper to apply theme to document
const applyTheme = (theme: Theme) => {
  if (typeof document !== 'undefined') {
    // We use a `.light` class to enable the light theme overrides; dark is the default
    document.documentElement.classList.toggle('light', theme === 'light');
    // Also expose current theme and a data attribute for easier debugging in devtools
    document.documentElement.setAttribute('data-theme', theme);
    console.debug('[uiStore] Applied theme:', theme, 'classList:', document.documentElement.className);
  }
};

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set, get) => ({
        sidebarOpen: false,
        setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),
        filtersOpen: false,
        setFiltersOpen: (open) => set({ filtersOpen: open }, false, 'setFiltersOpen'),
        modalOpen: false,
        setModalOpen: (open) => set({ modalOpen: open }, false, 'setModalOpen'),
        loading: false,
        setLoading: (loading) => set({ loading }, false, 'setLoading'),

        theme: 'dark', // default, will be overridden by persisted value
        setTheme: (t: Theme) => {
          set({ theme: t }, false, 'setTheme');
          applyTheme(t);
        },
        toggleTheme: () => {
          const next = get().theme === 'dark' ? 'light' : 'dark';
          get().setTheme(next);
        },
      }),
      {
        name: 'rv-ui-store',
        partialize: (state) => ({ theme: state.theme }), // Only persist theme
        onRehydrateStorage: () => (state) => {
          if (state) {
            applyTheme(state.theme);
          }
        },
      }
    ),
    { name: 'UI Store' }
  )
);
