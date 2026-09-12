/**
 * Reusable ThemedButton Component
 * Supports primary romantic gradients/solids, secondary, outline, and ghost variants.
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  style,
  className,
  onPress,
  ...restProps
}) => {
  const { colors, radius, shadows, isDark } = useTheme();

  const getContainerStyles = (): ViewStyle => {
    // Size paddings
    const sizeStyle: ViewStyle =
      size === 'sm'
        ? { paddingVertical: 10, paddingHorizontal: 16 }
        : size === 'lg'
        ? { paddingVertical: 16, paddingHorizontal: 28 }
        : { paddingVertical: 14, paddingHorizontal: 22 };

    // Variant colors & borders
    let variantStyle: ViewStyle;
    switch (variant) {
      case 'secondary':
        variantStyle = {
          backgroundColor: isDark ? colors.surfaceElevated : colors.backgroundSecondary,
          borderWidth: 1,
          borderColor: colors.border,
        };
        break;
      case 'outline':
        variantStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.tint,
        };
        break;
      case 'ghost':
        variantStyle = {
          backgroundColor: 'transparent',
        };
        break;
      case 'primary':
      default:
        variantStyle = {
          backgroundColor: colors.tint,
          ...shadows.sm,
        };
        break;
    }

    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius['2xl'],
      width: fullWidth ? '100%' : undefined,
      opacity: disabled || loading ? 0.6 : 1,
      ...sizeStyle,
      ...variantStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    let textColor = '#FFFFFF';
    if (variant === 'secondary') {
      textColor = colors.textPrimary;
    } else if (variant === 'outline' || variant === 'ghost') {
      textColor = colors.tint;
    }

    let fontSize = 16;
    if (size === 'sm') fontSize = 14;
    if (size === 'lg') fontSize = 18;

    return {
      color: textColor,
      fontSize,
      fontWeight: '600',
      textAlign: 'center',
      includeFontPadding: false,
    };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[getContainerStyles(), style]}
      className={className}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : colors.tint}
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <View style={styles.rightIconWrapper}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconWrapper: {
    marginRight: 8,
  },
  rightIconWrapper: {
    marginLeft: 8,
  },
});

export default ThemedButton;
