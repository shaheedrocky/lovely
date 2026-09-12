/**
 * Reusable GenderSelector Component
 * Modern selection cards with animated highlight for dating onboarding.
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme';
import { Gender } from '../../types/profile';

interface GenderOption {
  id: Gender;
  label: string;
  icon: string;
}

const GENDER_OPTIONS: GenderOption[] = [
  { id: 'male', label: 'Male', icon: '👨' },
  { id: 'female', label: 'Female', icon: '👩' },
  { id: 'other', label: 'Other / Non-Binary', icon: '🌈' },
];

export interface GenderSelectorProps {
  selectedGender: Gender | '';
  onSelect: (gender: Gender) => void;
  error?: string;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onSelect,
  error,
}) => {
  const { colors, isDark, radius, shadows } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: error ? colors.status.error : colors.textSecondary,
          },
        ]}
      >
        I Identify As
      </Text>

      <View style={styles.optionsRow}>
        {GENDER_OPTIONS.map(option => {
          const isSelected = selectedGender === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => onSelect(option.id)}
              style={[
                styles.optionCard,
                isSelected && shadows.sm,
                {
                  borderRadius: radius.xl,
                  backgroundColor: isSelected
                    ? isDark
                      ? 'rgba(255, 71, 126, 0.16)'
                      : 'rgba(255, 71, 126, 0.08)'
                    : isDark
                    ? colors.surfaceElevated
                    : colors.surface,
                  borderColor: isSelected
                    ? colors.tint
                    : isDark
                    ? colors.border
                    : colors.inputBorder,
                },
              ]}
            >
              <Text style={styles.icon}>{option.icon}</Text>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color: isSelected ? colors.tint : colors.textPrimary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    includeFontPadding: false,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: 12,
    textAlign: 'center',
    includeFontPadding: false,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    includeFontPadding: false,
  },
});

export default GenderSelector;
