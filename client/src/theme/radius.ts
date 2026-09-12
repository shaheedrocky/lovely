/**
 * Border Radius Tokens for Lovely App
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  full: 9999,
} as const;

export type Radius = keyof typeof radius;

export default radius;
