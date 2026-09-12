/**
 * Reusable ThemedText Component
 * Pre-configured typography presets with automatic theme color adaptation.
 */

import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../../theme';

export type TextVariant =
  | 'brandHero'
  | 'brandTitle'
  | 'brandSubtitle'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'button'
  | 'tagline';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'brand'
  | 'inverse'
  | 'white';

export interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  color = 'primary',
  align,
  style,
  className,
  children,
  ...restProps
}) => {
  const { colors, typography } = useTheme();

  const getTextColor = (): string => {
    switch (color) {
      case 'secondary':
        return colors.textSecondary;
      case 'muted':
        return colors.textMuted;
      case 'brand':
        return colors.textBrand;
      case 'inverse':
        return colors.textInverse;
      case 'white':
        return '#FFFFFF';
      case 'primary':
      default:
        return colors.textPrimary;
    }
  };

  const presetStyle = typography.presets[variant] || typography.presets.body;

  const combinedStyle: TextStyle = {
    ...presetStyle,
    color: getTextColor(),
    textAlign: align,
    includeFontPadding: false,
  };

  return (
    <Text
      style={[combinedStyle, style]}
      className={className}
      {...restProps}
    >
      {children}
    </Text>
  );
};

export default ThemedText;
