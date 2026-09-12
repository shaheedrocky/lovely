/**
 * React Navigation Theme Integrations for Lovely App
 */

import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { lightColors, darkColors } from './colors';

export const navigationLightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: lightColors.tint,
    background: lightColors.background,
    card: lightColors.card,
    text: lightColors.textPrimary,
    border: lightColors.border,
    notification: lightColors.status.match,
  },
};

export const navigationDarkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: darkColors.tint,
    background: darkColors.background,
    card: darkColors.card,
    text: darkColors.textPrimary,
    border: darkColors.border,
    notification: darkColors.status.match,
  },
};

export default {
  light: navigationLightTheme,
  dark: navigationDarkTheme,
};
