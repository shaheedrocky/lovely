/**
 * Reusable SelectionCard Component
 * Interactive selection tile with animated border, icon, and checkmark.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme';

export interface SelectionCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  selected: boolean;
  onPress: () => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  subtitle,
  icon,
  selected,
  onPress,
}) => {
  const { colors, isDark, radius, shadows } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        selected && shadows.sm,
        {
          borderRadius: radius['2xl'],
          backgroundColor: selected
            ? isDark
              ? 'rgba(255, 71, 126, 0.14)'
              : 'rgba(255, 71, 126, 0.07)'
            : isDark
            ? colors.surfaceElevated
            : colors.surface,
          borderColor: selected
            ? colors.tint
            : isDark
            ? colors.border
            : colors.cardBorder,
        },
      ]}
    >
      <View style={styles.leftContent}>
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: selected ? colors.tint : colors.textPrimary,
                fontWeight: selected ? '700' : '600',
              },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* Radio Circle / Checkmark */}
      <View
        style={[
          styles.radioCircle,
          {
            borderColor: selected ? colors.tint : colors.border,
            backgroundColor: selected ? colors.tint : 'transparent',
          },
        ]}
      >
        {selected && <Text style={styles.checkText}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    marginBottom: 10,
    width: '100%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    includeFontPadding: false,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    includeFontPadding: false,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    includeFontPadding: false,
  },
});

export default SelectionCard;
