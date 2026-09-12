/**
 * Custom Hook for accessing Lovely Theme tokens and controls
 */

import { useContext } from 'react';
import { ThemeContext, ThemeContextValue } from './ThemeContext';
import { lightColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { navigationLightTheme } from './navigationTheme';

const fallbackTheme: ThemeContextValue = {
  themeMode: 'light',
  isDark: false,
  colors: lightColors,
  typography,
  spacing,
  radius,
  shadows,
  navigationTheme: navigationLightTheme,
  setThemeMode: () => {
    console.warn('[useTheme] setThemeMode called outside ThemeProvider');
  },
  toggleTheme: () => {
    console.warn('[useTheme] toggleTheme called outside ThemeProvider');
  },
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    return fallbackTheme;
  }
  return context;
};

export default useTheme;
