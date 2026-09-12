/**
 * Custom iOS-style Floating Pill Toast Component
 * Sleek, spring-animated, swipe/tap to dismiss, with romantic dating accents.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

export type ToastType = 'success' | 'error' | 'info' | 'heart';

export interface ToastConfig {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface CustomToastProps {
  toast: ToastConfig | null;
  onDismiss: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  toast,
  onDismiss,
}) => {
  const { colors, isDark, shadows } = useTheme();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  // PanResponder to allow swiping up to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -30) {
          dismissToast();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    }),
  ).current;

  const dismissToast = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  }, [onDismiss, opacity, translateY]);

  useEffect(() => {
    if (!toast) return;

    // Reset position
    translateY.setValue(-100);
    opacity.setValue(0);
    scale.setValue(0.92);

    // Spring down into view
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 7,
        tension: 80,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
    ]).start();

    const duration = toast.duration || 3500;
    const timer = setTimeout(() => {
      dismissToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, dismissToast, opacity, scale, translateY]);

  if (!toast) return null;

  const getToastIcon = () => {
    switch (toast.type) {
      case 'heart':
        return '💖';
      case 'error':
        return '⚠️';
      case 'info':
        return '✨';
      case 'success':
      default:
        return '✓';
    }
  };

  const getAccentColor = () => {
    switch (toast.type) {
      case 'heart':
        return colors.status.like;
      case 'error':
        return colors.status.error;
      case 'info':
        return colors.status.info;
      case 'success':
      default:
        return colors.status.success;
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.overlayContainer,
        {
          top: insets.top > 0 ? insets.top + 6 : 16,
        },
      ]}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.toastCard,
          shadows.lg,
          {
            backgroundColor: isDark ? colors.surfaceElevated : colors.surface,
            borderColor: isDark ? colors.cardBorder : colors.cardBorder,
            opacity,
            transform: [{ translateY }, { scale }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={dismissToast}
          style={styles.touchableContent}
        >
          {/* Leading Icon Badge */}
          <View
            style={[
              styles.iconBadge,
              {
                backgroundColor: isDark
                  ? 'rgba(255, 71, 126, 0.18)'
                  : 'rgba(255, 71, 126, 0.1)',
                borderColor: getAccentColor(),
              },
            ]}
          >
            <Text style={styles.iconText}>{getToastIcon()}</Text>
          </View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            {toast.title && (
              <Text
                numberOfLines={1}
                style={[
                  styles.titleText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {toast.title}
              </Text>
            )}
            <Text
              numberOfLines={2}
              style={[
                styles.messageText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {toast.message}
            </Text>
          </View>

          {/* Dismiss hint */}
          <View style={styles.dismissIndicator} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    paddingHorizontal: 16,
  },
  toastCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  touchableContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    includeFontPadding: false,
  },
  messageText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    includeFontPadding: false,
  },
  dismissIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
    opacity: 0.3,
    marginLeft: 8,
  },
});

export default CustomToast;
