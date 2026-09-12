/**
 * Interactive Dual-Range & Distance Slider Component
 * Supports Age range selection (e.g. "21 — 32") and Distance (e.g. "Within 25 km").
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../theme';
import { AgeRange } from '../../types/profile';

export interface AgeRangeSliderProps {
  range: AgeRange;
  onChange: (range: AgeRange) => void;
  minLimit?: number;
  maxLimit?: number;
}

export const AgeRangeSlider: React.FC<AgeRangeSliderProps> = ({
  range,
  onChange,
  minLimit = 18,
  maxLimit = 55,
}) => {
  const { colors, isDark, radius } = useTheme();

  const handleMinChange = (delta: number) => {
    const nextMin = Math.max(minLimit, Math.min(range.max - 1, range.min + delta));
    onChange({ min: nextMin, max: range.max });
  };

  const handleMaxChange = (delta: number) => {
    const nextMax = Math.min(maxLimit, Math.max(range.min + 1, range.max + delta));
    onChange({ min: range.min, max: nextMax });
  };

  // Preset age brackets
  const PRESETS: Array<{ label: string; min: number; max: number }> = [
    { label: '18 - 25', min: 18, max: 25 },
    { label: '21 - 30', min: 21, max: 30 },
    { label: '25 - 35', min: 25, max: 35 },
    { label: '30 - 45', min: 30, max: 45 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Age Preference
        </Text>
        <View
          style={[
            styles.valueBadge,
            {
              backgroundColor: isDark
                ? 'rgba(255, 71, 126, 0.16)'
                : 'rgba(255, 71, 126, 0.08)',
              borderColor: colors.tint,
            },
          ]}
        >
          <Text style={[styles.valueText, { color: colors.tint }]}>
            {range.min} — {range.max} years
          </Text>
        </View>
      </View>

      {/* Stepper Controls Row */}
      <View style={styles.stepperRow}>
        {/* Min Stepper */}
        <View
          style={[
            styles.stepperBox,
            {
              backgroundColor: isDark
                ? colors.surfaceElevated
                : colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
            },
          ]}
        >
          <Text style={[styles.stepperSublabel, { color: colors.textMuted }]}>
            Min Age
          </Text>
          <View style={styles.stepperActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMinChange(-1)}
              style={[styles.stepperBtn, { borderColor: colors.border }]}
            >
              <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={[styles.stepperVal, { color: colors.textPrimary }]}>
              {range.min}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMinChange(1)}
              style={[styles.stepperBtn, { borderColor: colors.border }]}
            >
              <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Max Stepper */}
        <View
          style={[
            styles.stepperBox,
            {
              backgroundColor: isDark
                ? colors.surfaceElevated
                : colors.surface,
              borderColor: colors.border,
              borderRadius: radius.xl,
            },
          ]}
        >
          <Text style={[styles.stepperSublabel, { color: colors.textMuted }]}>
            Max Age
          </Text>
          <View style={styles.stepperActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMaxChange(-1)}
              style={[styles.stepperBtn, { borderColor: colors.border }]}
            >
              <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={[styles.stepperVal, { color: colors.textPrimary }]}>
              {range.max}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMaxChange(1)}
              style={[styles.stepperBtn, { borderColor: colors.border }]}
            >
              <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Presets */}
      <View style={styles.presetsRow}>
        {PRESETS.map((p, idx) => {
          const isSelected = range.min === p.min && range.max === p.max;
          return (
            <TouchableOpacity
              key={`preset-${idx}`}
              activeOpacity={0.8}
              onPress={() => onChange({ min: p.min, max: p.max })}
              style={[
                styles.presetChip,
                {
                  borderRadius: radius.full,
                  backgroundColor: isSelected
                    ? colors.tint
                    : isDark
                    ? colors.surfaceElevated
                    : colors.surface,
                  borderColor: isSelected ? colors.tint : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.presetText,
                  {
                    color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export interface DistanceSliderProps {
  distanceKm: number;
  onChange: (distance: number) => void;
}

export const DistanceSlider: React.FC<DistanceSliderProps> = ({
  distanceKm,
  onChange,
}) => {
  const { colors, isDark, radius } = useTheme();

  const DISTANCE_PRESETS = [5, 15, 25, 50, 100];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Maximum Distance
        </Text>
        <View
          style={[
            styles.valueBadge,
            {
              backgroundColor: isDark
                ? 'rgba(255, 71, 126, 0.16)'
                : 'rgba(255, 71, 126, 0.08)',
              borderColor: colors.tint,
            },
          ]}
        >
          <Text style={[styles.valueText, { color: colors.tint }]}>
            Within {distanceKm} km
          </Text>
        </View>
      </View>

      <View style={styles.presetsRow}>
        {DISTANCE_PRESETS.map(km => {
          const isSelected = distanceKm === km;
          return (
            <TouchableOpacity
              key={`km-${km}`}
              activeOpacity={0.8}
              onPress={() => onChange(km)}
              style={[
                styles.distancePresetChip,
                {
                  borderRadius: radius.full,
                  backgroundColor: isSelected
                    ? colors.tint
                    : isDark
                    ? colors.surfaceElevated
                    : colors.surface,
                  borderColor: isSelected ? colors.tint : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.presetText,
                  {
                    color: isSelected ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {km} km
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  valueBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  valueText: {
    fontSize: 13,
    fontWeight: '700',
    includeFontPadding: false,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  stepperBox: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  stepperSublabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    includeFontPadding: false,
  },
  stepperActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    includeFontPadding: false,
  },
  stepperVal: {
    fontSize: 18,
    fontWeight: '700',
    includeFontPadding: false,
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  distancePresetChip: {
    flex: 1,
    paddingVertical: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetText: {
    fontSize: 13,
    includeFontPadding: false,
  },
});

export default { AgeRangeSlider, DistanceSlider };
