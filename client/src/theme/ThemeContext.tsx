/**
 * Theme Context and Provider for Lovely App
 * Orchestrates Light, Dark, and System modes with NativeWind and React Navigation.
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useColorScheme as useNWColorScheme } from 'nativewind';
import { lightColors, darkColors, ThemeColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { navigationLightTheme, navigationDarkTheme } from './navigationTheme';
import { Theme as NavigationTheme } from '@react-navigation/native';
import { devNav } from '../lib';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  themeMode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
  navigationTheme: NavigationTheme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

export interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialMode = 'system',
}) => {
  const systemColorScheme = useRNColorScheme();
  const { setColorScheme: setNWColorScheme } = useNWColorScheme();

  const [themeMode, setThemeModeState] = useState<ThemeMode>(
    () => devNav.getThemeMode() || initialMode,
  );

  // Determine active visual mode (true for dark, false for light)
  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  // Synchronize with NativeWind colorScheme
  useEffect(() => {
    try {
      if (setNWColorScheme) {
        setNWColorScheme(themeMode);
      }
    } catch {
      // Fallback silently if running in non-standard environment
    }
  }, [themeMode, setNWColorScheme]);

  const setThemeMode = useCallback(
    (newMode: ThemeMode) => {
      devNav.setThemeMode(newMode);
      setThemeModeState(newMode);
      try {
        if (setNWColorScheme) {
          setNWColorScheme(newMode);
        }
      } catch {
        // Fallback silently
      }
    },
    [setNWColorScheme],
  );

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => {
      let nextMode: ThemeMode;
      if (prevMode === 'system') {
        nextMode = isDark ? 'light' : 'dark';
      } else {
        nextMode = prevMode === 'light' ? 'dark' : 'light';
      }
      devNav.setThemeMode(nextMode);
      try {
        if (setNWColorScheme) {
          setNWColorScheme(nextMode);
        }
      } catch {
        // Fallback silently
      }
      return nextMode;
    });
  }, [isDark, setNWColorScheme]);

  // Active theme tokens
  const activeColors = useMemo(() => {
    return isDark ? darkColors : lightColors;
  }, [isDark]);

  const activeNavTheme = useMemo(() => {
    return isDark ? navigationDarkTheme : navigationLightTheme;
  }, [isDark]);

  const contextValue = useMemo<ThemeContextValue>(() => {
    return {
      themeMode,
      isDark,
      colors: activeColors,
      typography,
      spacing,
      radius,
      shadows,
      navigationTheme: activeNavTheme,
      setThemeMode,
      toggleTheme,
    };
  }, [
    themeMode,
    isDark,
    activeColors,
    activeNavTheme,
    setThemeMode,
    toggleTheme,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
