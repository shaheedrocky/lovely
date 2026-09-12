/**
 * Reusable ThemedCard Component
 * Elevated container with theme-aware background, border, and shadows.
 */

import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface ThemedCardProps extends ViewProps {
  elevated?: boolean;
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  elevated = true,
  bordered = true,
  style,
  className,
  children,
  ...restProps
}) => {
  const { colors, radius, shadows, isDark } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: isDark ? colors.card : colors.surface,
    borderRadius: radius['2xl'],
    borderWidth: bordered ? 1 : 0,
    borderColor: isDark ? colors.cardBorder : colors.cardBorder,
    padding: 16,
    ...(elevated ? (isDark ? shadows.xs : shadows.sm) : {}),
  };

  return (
    <View style={[cardStyle, style]} className={className} {...restProps}>
      {children}
    </View>
  );
};

export default ThemedCard;
