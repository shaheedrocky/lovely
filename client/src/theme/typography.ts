/**
 * Typography Tokens & Presets for Lovely App
 */

import { TextStyle } from 'react-native';

export const fontFamilies = {
  // Brand cursive fonts
  tangerine: 'Tangerine-Regular',
  tangerineBold: 'Tangerine-Bold',

  // System fonts
  system: undefined, // Default system font (San Francisco on iOS, Roboto on Android)
};

export const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 90,
} as const;

export const fontWeights = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

export const lineHeights = {
  none: 1,
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const letterSpacings = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.5,
  wider: 1.5,
  widest: 3.0,
  superWide: 4.0,
} as const;

export const typographyPresets: Record<string, TextStyle> = {
  brandHero: {
    fontFamily: fontFamilies.tangerineBold,
    fontSize: fontSizes['8xl'],
    lineHeight: 104,
  },
  brandTitle: {
    fontFamily: fontFamilies.tangerineBold,
    fontSize: fontSizes['7xl'],
    lineHeight: 84,
  },
  brandSubtitle: {
    fontFamily: fontFamilies.tangerine,
    fontSize: fontSizes['4xl'],
    lineHeight: 44,
  },
  h1: {
    fontSize: fontSizes['3xl'],
    fontWeight: '700',
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes['2xl'],
    fontWeight: '700',
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
    lineHeight: fontSizes.xl * lineHeights.snug,
  },
  h4: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    lineHeight: fontSizes.lg * lineHeights.snug,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: '400',
    lineHeight: fontSizes.lg * lineHeights.normal,
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: '400',
    lineHeight: fontSizes.base * lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: '400',
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: '500',
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
  button: {
    fontSize: fontSizes.base,
    fontWeight: '600',
    lineHeight: fontSizes.base * lineHeights.tight,
  },
  buttonSmall: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    lineHeight: fontSizes.sm * lineHeights.tight,
  },
  tagline: {
    fontSize: fontSizes.xs,
    fontWeight: '600',
    letterSpacing: letterSpacings.widest,
    textTransform: 'uppercase',
  },
};

export const typography = {
  families: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
  letterSpacings,
  presets: typographyPresets,
};

export default typography;
