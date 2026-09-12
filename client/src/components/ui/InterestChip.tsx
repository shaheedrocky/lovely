/**
 * Reusable InterestChip Component
 * Spring-animated selectable chip with icon, title, and checkmark.
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
import { InterestItem } from '../../types/profile';

export interface InterestChipProps {
  item: InterestItem;
  selected: boolean;
  onToggle: () => void;
}

export const InterestChip: React.FC<InterestChipProps> = ({
  item,
  selected,
  onToggle,
}) => {
  const { colors, isDark, radius } = useTheme();

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.94,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selected, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={[
          styles.chip,
          {
            borderRadius: radius.full,
            backgroundColor: selected
              ? colors.tint
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
        <Text style={styles.icon}>{item.icon}</Text>
        <Text
          style={[
            styles.name,
            {
              color: selected ? '#FFFFFF' : colors.textPrimary,
              fontWeight: selected ? '700' : '500',
            },
          ]}
        >
          {item.name}
        </Text>

        {selected && (
          <View style={styles.checkWrapper}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    marginRight: 8,
    marginBottom: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  name: {
    fontSize: 14,
    includeFontPadding: false,
  },
  checkWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    includeFontPadding: false,
  },
});

export default InterestChip;
