/**
 * Multi-Step Progress Indicator
 * Displays "Step X of Y" with a smooth animated gradient bar.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../theme';

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack = true,
}) => {
  const { colors, isDark } = useTheme();

  const progressAnim = useRef(
    new Animated.Value(currentStep / totalSteps),
  ).current;

  useEffect(() => {
    Animated.spring(progressAnim, {
      toValue: currentStep / totalSteps,
      friction: 8,
      tension: 60,
      useNativeDriver: false,
    }).start();
  }, [currentStep, totalSteps, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Header Row: Back Button + Step Counter */}
      <View style={styles.headerRow}>
        {canGoBack && onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={[
              styles.backButton,
              {
                backgroundColor: isDark
                  ? colors.surfaceElevated
                  : colors.backgroundSecondary,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.backArrow, { color: colors.textPrimary }]}>
              ←
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View
          style={[
            styles.stepBadge,
            {
              backgroundColor: isDark
                ? 'rgba(255, 71, 126, 0.15)'
                : 'rgba(255, 71, 126, 0.08)',
              borderColor: isDark ? colors.border : colors.primary[200],
            },
          ]}
        >
          <Text style={[styles.stepText, { color: colors.tint }]}>
            {currentStep} of {totalSteps}
          </Text>
        </View>

        <View style={styles.placeholder} />
      </View>

      {/* Progress Track */}
      <View
        style={[
          styles.track,
          {
            backgroundColor: isDark
              ? colors.borderSubtle
              : colors.border,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              width: progressWidth,
              backgroundColor: colors.tint,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: '700',
    includeFontPadding: false,
  },
  placeholder: {
    width: 38,
  },
  stepBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  track: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressIndicator;
