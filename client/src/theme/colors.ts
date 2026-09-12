/**
 * Central Color Tokens for Lovely App
 * Romantic, modern, and accessible palette designed for dating & social connections.
 */

export const palette = {
  // Primary Passion / Rose / Berry (50 - 950)
  primary: {
    50: '#FFF1F5',
    100: '#FFE4EC',
    200: '#FFC9D9',
    300: '#FF9FBA',
    400: '#FF6F95',
    500: '#FF477E',
    600: '#F52F68',
    700: '#D91F54',
    800: '#B51D48',
    900: '#961D41',
    950: '#4C0519',
  },

  // Secondary Romantic Violet / Lavender (50 - 950)
  secondary: {
    50: '#F7F3FF',
    100: '#EEE6FF',
    200: '#DDCEFF',
    300: '#C3A8FF',
    400: '#A77BFF',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    950: '#2E1065',
  },

  // Warm Romance Accents
  accent: {
    pink: '#FF477E',
    purple: '#8B5CF6',
    rose: '#FB7185',
    coral: '#FF6B6B',
    peach: '#FDBA74',
    peachLight: '#FFF0EB',
    amber: '#F59E0B',
    gold: '#FBBF24',
    mint: '#2DD4BF',
  },

  // Neutrals / Slate & Gray
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // System & Social Status Indicators
  status: {
    online: '#10B981',
    offline: '#94A3B8',
    match: '#EC4899',
    superlike: '#0EA5E9',
    like: '#FF477E',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

export type ThemeColors = {
  // Backgrounds & Surfaces
  background: string;
  backgroundSecondary: string;
  backgroundSoft: string;
  surface: string;
  surfaceElevated: string;
  card: string;
  cardBorder: string;

  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  textBrand: string;

  // Borders & Dividers
  border: string;
  borderSubtle: string;
  divider: string;

  // Form Controls
  inputBackground: string;
  inputBorder: string;
  inputBorderFocused: string;
  placeholder: string;

  // Navigation & Badges
  tint: string;
  tabBar: string;
  tabBarBorder: string;
  overlay: string;
  backdrop: string;

  // Interactive Brand Colors
  primary: typeof palette.primary;
  secondary: typeof palette.secondary;
  accent: typeof palette.accent;
  status: typeof palette.status;
};

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundSoft: '#FFF7F9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFF9FB',
  card: '#FFFFFF',
  cardBorder: '#FDE4ED',

  textPrimary: '#1E1B22',
  textSecondary: '#52525B',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',
  textBrand: '#D91F54',

  border: '#F0E4EB',
  borderSubtle: '#F7EFF3',
  divider: '#F1F5F9',

  inputBackground: '#F9FAFB',
  inputBorder: '#E4E4E7',
  inputBorderFocused: '#FF477E',
  placeholder: '#9CA3AF',

  tint: '#D91F54',
  tabBar: '#FFFFFF',
  tabBarBorder: '#F1F5F9',
  overlay: 'rgba(0, 0, 0, 0.45)',
  backdrop: 'rgba(255, 241, 245, 0.7)',

  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  status: palette.status,
};

export const darkColors: ThemeColors = {
  background: '#0F0E17',
  backgroundSecondary: '#161424',
  backgroundSoft: '#181528',
  surface: '#1E1A33',
  surfaceElevated: '#282344',
  card: '#1F1B35',
  cardBorder: '#352E59',

  textPrimary: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  textInverse: '#0F0E17',
  textBrand: '#FF6F95',

  border: '#2E284D',
  borderSubtle: '#24203D',
  divider: '#262140',

  inputBackground: '#171428',
  inputBorder: '#3A335E',
  inputBorderFocused: '#FF6F95',
  placeholder: '#64748B',

  tint: '#FF6F95',
  tabBar: '#151324',
  tabBarBorder: '#282344',
  overlay: 'rgba(0, 0, 0, 0.75)',
  backdrop: 'rgba(15, 14, 23, 0.85)',

  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  status: palette.status,
};

export const colors = {
  palette,
  light: lightColors,
  dark: darkColors,
};

export default colors;
