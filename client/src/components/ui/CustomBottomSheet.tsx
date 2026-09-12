/**
 * Reusable Custom BottomSheet Component
 * Smooth spring entrance, drag handle, backdrop blur/dim, and safe area support.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: number;
}

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  maxHeight = SCREEN_HEIGHT * 0.75,
}) => {
  const { colors, isDark, shadows, radius } = useTheme();
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 8;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80) {
          closeSheet();
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

  const closeSheet = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
          tension: 75,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity, translateY]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={closeSheet}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: isDark
                ? 'rgba(0, 0, 0, 0.75)'
                : 'rgba(15, 14, 23, 0.55)',
              opacity: backdropOpacity,
            },
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
        </Animated.View>

        {/* Sliding Sheet */}
        <Animated.View
          style={[
            styles.sheetContainer,
            shadows.xl,
            {
              backgroundColor: isDark ? colors.surfaceElevated : colors.surface,
              borderColor: isDark ? colors.cardBorder : colors.cardBorder,
              borderTopLeftRadius: radius['3xl'],
              borderTopRightRadius: radius['3xl'],
              maxHeight,
              paddingBottom: Math.max(insets.bottom, 16),
              transform: [{ translateY }],
            },
          ]}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers} style={styles.handleContainer}>
            <View
              style={[
                styles.dragHandle,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />
          </View>

          {/* Title Header */}
          {title && (
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: colors.textPrimary,
                  },
                ]}
              >
                {title}
              </Text>
            </View>
          )}

          {/* Content */}
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    width: '100%',
    borderTopWidth: 1,
    overflow: 'hidden',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    includeFontPadding: false,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default CustomBottomSheet;
