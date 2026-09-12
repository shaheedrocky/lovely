import { Platform, Settings } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

interface DevGlobalState {
  __DEV_NAV_STATE__?: any;
  __HAS_SEEN_SPLASH__?: boolean;
  __LAST_ROUTE__?: string;
  __THEME_MODE__?: ThemeMode;
}

const g = globalThis as unknown as DevGlobalState;
const THEME_KEY = 'LOVELY_THEME_MODE';

export const devNav = {
  getNavState: () => g.__DEV_NAV_STATE__,
  setNavState: (state: any) => {
    g.__DEV_NAV_STATE__ = state;
  },
  hasSeenSplash: () => !!g.__HAS_SEEN_SPLASH__,
  setHasSeenSplash: (seen: boolean = true) => {
    g.__HAS_SEEN_SPLASH__ = seen;
  },
  getLastRoute: () => g.__LAST_ROUTE__,
  setLastRoute: (route?: string) => {
    g.__LAST_ROUTE__ = route;
  },
  getThemeMode: (): ThemeMode | undefined => {
    if (g.__THEME_MODE__) {
      return g.__THEME_MODE__;
    }
    if (Platform.OS === 'ios') {
      try {
        const saved = Settings.get(THEME_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          g.__THEME_MODE__ = saved;
          return saved;
        }
      } catch {
        // Safe fallback
      }
    }
    return undefined;
  },
  setThemeMode: (mode: ThemeMode) => {
    g.__THEME_MODE__ = mode;
    if (Platform.OS === 'ios') {
      try {
        Settings.set({ [THEME_KEY]: mode });
      } catch {
        // Safe fallback
      }
    }
  },
};

export default devNav;
