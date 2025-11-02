import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type ScriptOption = 'devanagari' | 'iast' | 'both';
export type TranslationOption = 'Griffith' | 'Jamison-Brereton' | 'Wilson';
export type ReadingMode = 'scroll' | 'card' | 'parallel';

export interface UserPrefs {
  defaultScript: ScriptOption;
  translation: TranslationOption;
  fontSize: number;
  lineSpacing: number;
  readingMode: ReadingMode;
  colorScheme: string;
  animationSpeed: number;
  reducedMotion: boolean;
  audioAutoPlay: boolean;
  audioSpeed: number;
  audioVolume: number;
  setPref: <T extends keyof Omit<UserPrefs, 'setPref' | 'setMulti' | 'resetPrefs'>>(
    key: T,
    value: UserPrefs[T]
  ) => void;
  setMulti: (prefs: Partial<Omit<UserPrefs, 'setPref' | 'setMulti' | 'resetPrefs'>>) => void;
  resetPrefs: () => void;
}

const defaultPrefs = {
  defaultScript: 'devanagari' as ScriptOption,
  translation: 'Griffith' as TranslationOption,
  fontSize: 20,
  lineSpacing: 1.5,
  readingMode: 'scroll' as ReadingMode,
  colorScheme: 'vedic',
  animationSpeed: 200,
  reducedMotion: false,
  audioAutoPlay: false,
  audioSpeed: 1,
  audioVolume: 1,
};

export const useUserStore = create<UserPrefs>()(
  devtools(
    persist(
      (set) => ({
        ...defaultPrefs,
        setPref: (key, value) =>
          set((state) => ({ ...state, [key]: value }), false, `setPref:${key}`),
        setMulti: (prefs) =>
          set((state) => ({ ...state, ...prefs }), false, 'setMulti'),
        resetPrefs: () =>
          set(defaultPrefs, false, 'resetPrefs'),
      }),
      {
        name: 'rv-user-prefs',
      }
    ),
    { name: 'User Preferences' }
  )
);