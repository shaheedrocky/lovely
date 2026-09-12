/**
 * Reusable Custom Modal Dialog Component
 * Spring animation, backdrop blur effect, romantic branding.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import ThemedButton from '../common/ThemedButton';

export interface CustomModalAction {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  children?: React.ReactNode;
  primaryAction?: CustomModalAction;
  secondaryAction?: CustomModalAction;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  subtitle,
  icon,
  children,
  primaryAction,
  secondaryAction,
}) => {
  const { colors, isDark, shadows, radius } = useTheme();

  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scale.setValue(0.85);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          tension: 70,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, scale]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? 'rgba(0, 0, 0, 0.75)'
                : 'rgba(15, 14, 23, 0.55)',
            },
          ]}
          onPress={onClose}
        />

        {/* Modal Card */}
        <Animated.View
          style={[
            styles.modalContainer,
            shadows.xl,
            {
              backgroundColor: isDark ? colors.surfaceElevated : colors.surface,
              borderColor: isDark ? colors.cardBorder : colors.cardBorder,
              borderRadius: radius['3xl'],
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          {/* Close button top-right */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
          >
            <Text style={[styles.closeIcon, { color: colors.textMuted }]}>
              ✕
            </Text>
          </TouchableOpacity>

          {/* Optional Icon */}
          {icon && (
            <View style={styles.iconWrapper}>
              {typeof icon === 'string' ? (
                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor: isDark
                        ? 'rgba(255, 71, 126, 0.15)'
                        : 'rgba(255, 71, 126, 0.1)',
                      borderColor: isDark
                        ? colors.border
                        : colors.primary[200],
                    },
                  ]}
                >
                  <Text style={styles.iconEmoji}>{icon}</Text>
                </View>
              ) : (
                icon
              )}
            </View>
          )}

          {/* Title and Subtitle */}
          <Text
            style={[
              styles.title,
              {
                color: colors.textPrimary,
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

          {/* Custom Body Content */}
          {children && <View style={styles.bodyContent}>{children}</View>}

          {/* Actions */}
          <View style={styles.actionsContainer}>
            {primaryAction && (
              <ThemedButton
                title={primaryAction.label}
                variant="primary"
                loading={primaryAction.loading}
                onPress={primaryAction.onPress}
                size="md"
              />
            )}

            {secondaryAction && (
              <ThemedButton
                title={secondaryAction.label}
                variant="ghost"
                loading={secondaryAction.loading}
                onPress={secondaryAction.onPress}
                size="md"
                style={styles.secondaryButton}
              />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 380,
    padding: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconWrapper: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  iconEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    includeFontPadding: false,
  },
  bodyContent: {
    width: '100%',
    marginVertical: 12,
  },
  actionsContainer: {
    width: '100%',
    gap: 8,
    marginTop: 16,
  },
  secondaryButton: {
    marginTop: 4,
  },
});

export default CustomModal;
