/**
 * Reusable AnimatedInput Component
 * Floating/outlined input field with animated focus glow, character counter, and error handling.
 */

import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value = '',
  error,
  helperText,
  showCharCount = false,
  maxLength,
  leftIcon,
  rightIcon,
  containerStyle,
  onFocus,
  onBlur,
  multiline,
  style,
  ...restProps
}) => {
  const { colors, isDark, radius } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
    onBlur?.(e);
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error
        ? colors.status.error
        : isDark
        ? colors.border
        : colors.inputBorder,
      error ? colors.status.error : colors.tint,
    ],
  });

  const borderWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {/* Label and Character Count Row */}
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.label,
            {
              color: error
                ? colors.status.error
                : isFocused
                ? colors.tint
                : colors.textSecondary,
            },
          ]}
        >
          {label}
        </Text>

        {showCharCount && maxLength && (
          <Text
            style={[
              styles.counter,
              {
                color:
                  value.length >= maxLength
                    ? colors.status.error
                    : colors.textMuted,
              },
            ]}
          >
            {value.length} / {maxLength}
          </Text>
        )}
      </View>

      {/* Input Box */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor,
            borderWidth,
            borderRadius: radius.xl,
            backgroundColor: isDark
              ? colors.inputBackground
              : colors.inputBackground,
            minHeight: multiline ? 96 : 52,
            alignItems: multiline ? 'flex-start' : 'center',
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              // paddingTop: multiline ? 12 : 0,
            },
            style,
          ]}
          {...restProps}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>

      {/* Helper / Error Text */}
      {(error || helperText) && (
        <Text
          style={[
            styles.helperText,
            {
              color: error ? colors.status.error : colors.textMuted,
            },
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  counter: {
    fontSize: 12,
    fontWeight: '500',
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    includeFontPadding: false,
    paddingVertical: 12,
  },
  leftIcon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  rightIcon: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '400',
    includeFontPadding: false,
  },
});

export default AnimatedInput;
