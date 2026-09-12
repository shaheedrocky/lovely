/**
 * Reusable ThemeToggle Component
 * Interactive pill button for switching between Light and Dark themes.
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface ThemeToggleProps {
  showLabel?: boolean;
  style?: ViewStyle;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  style,
  className,
}) => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surfaceElevated : colors.backgroundSecondary,
          borderColor: colors.border,
        },
        style,
      ]}
      className={className}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: isDark ? colors.tint : colors.tint,
          },
        ]}
      >
        <Text style={styles.iconText}>{isDark ? '🌙' : '☀️'}</Text>
      </View>

      {showLabel && (
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    includeFontPadding: false,
  },
});

export default ThemeToggle;
