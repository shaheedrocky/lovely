/**
 * Reusable ThemedView Component
 * Adapts automatically to Light and Dark mode surfaces.
 */

import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

export interface ThemedViewProps extends ViewProps {
  safe?: boolean;
  edges?: Edge[];
  variant?: 'default' | 'surface' | 'secondary' | 'soft' | 'card' | 'transparent';
  children?: React.ReactNode;
  className?: string;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  safe = false,
  edges,
  variant = 'default',
  style,
  children,
  className,
  ...restProps
}) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return colors.surface;
      case 'secondary':
        return colors.backgroundSecondary;
      case 'soft':
        return colors.backgroundSoft;
      case 'card':
        return colors.card;
      case 'transparent':
        return 'transparent';
      case 'default':
      default:
        return colors.background;
    }
  };

  const containerStyle = [
    { backgroundColor: getBackgroundColor() },
    style,
  ];

  if (safe) {
    return (
      <SafeAreaView
        edges={edges}
        style={containerStyle}
        className={className}
        {...restProps}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={containerStyle} className={className} {...restProps}>
      {children}
    </View>
  );
};

export default ThemedView;
