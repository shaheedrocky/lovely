/**
 * 6-Slot Photo Grid Component
 * 1 Primary large card + 5 secondary cards with add/remove/primary capabilities.
 */

import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { PhotoSlot } from '../../types/profile';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_PADDING = 20;
const GAP = 12;
const TOTAL_WIDTH = SCREEN_WIDTH - GRID_PADDING * 2;

// Top row: Large primary photo takes ~62% width, side column has 2 slots stacked (~38% width)
const PRIMARY_WIDTH = (TOTAL_WIDTH - GAP) * 0.62;
const PRIMARY_HEIGHT = PRIMARY_WIDTH * 1.35;
const SIDE_WIDTH = TOTAL_WIDTH - GAP - PRIMARY_WIDTH;
const SIDE_HEIGHT = (PRIMARY_HEIGHT - GAP) / 2;

// Bottom row: 3 equal slots
const BOTTOM_SLOT_WIDTH = (TOTAL_WIDTH - GAP * 2) / 3;
const BOTTOM_SLOT_HEIGHT = BOTTOM_SLOT_WIDTH * 1.3;

export interface PhotoPickerProps {
  photos: PhotoSlot[];
  onAddPhoto: (index: number) => void;
  onRemovePhoto: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
  onSetPrimary,
}) => {
  const { colors, isDark, radius, shadows } = useTheme();

  const renderSlot = (
    index: number,
    width: number,
    height: number,
    isPrimarySlot: boolean = false,
  ) => {
    const photo = photos[index];
    const isFilled = !!photo;

    return (
      <View
        key={`slot-${index}`}
        style={[
          styles.slotContainer,
          {
            width,
            height,
            borderRadius: radius['2xl'],
          },
        ]}
      >
        {isFilled ? (
          <View
            style={[
              styles.filledCard,
              shadows.sm,
              {
                borderRadius: radius['2xl'],
                borderColor: isPrimarySlot
                  ? colors.tint
                  : isDark
                  ? colors.border
                  : colors.cardBorder,
              },
            ]}
          >
            <Image
              source={{ uri: photo.url }}
              style={[styles.image, { borderRadius: radius['2xl'] }]}
              resizeMode="cover"
            />

            {/* Primary Photo Badge */}
            {isPrimarySlot && (
              <View
                style={[
                  styles.primaryBadge,
                  {
                    backgroundColor: colors.tint,
                  },
                ]}
              >
                <Text style={styles.primaryBadgeText}>★ PRIMARY</Text>
              </View>
            )}

            {/* Set Primary Button (if not already primary) */}
            {!isPrimarySlot && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onSetPrimary(photo.id)}
                style={styles.setPrimaryButton}
              >
                <Text style={styles.setPrimaryText}>Set Main</Text>
              </TouchableOpacity>
            )}

            {/* Remove Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onRemovePhoto(photo.id)}
              style={[
                styles.removeButton,
                {
                  backgroundColor: isDark
                    ? 'rgba(0, 0, 0, 0.75)'
                    : 'rgba(255, 255, 255, 0.9)',
                },
              ]}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Text style={[styles.removeText, { color: colors.status.error }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Empty Slot */
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onAddPhoto(index)}
            style={[
              styles.emptySlot,
              {
                borderRadius: radius['2xl'],
                backgroundColor: isDark
                  ? colors.surfaceElevated
                  : colors.backgroundSoft,
                borderColor: isDark
                  ? colors.border
                  : colors.primary[200],
              },
            ]}
          >
            <View
              style={[
                styles.plusCircle,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 71, 126, 0.18)'
                    : 'rgba(255, 71, 126, 0.12)',
                },
              ]}
            >
              <Text style={[styles.plusText, { color: colors.tint }]}>+</Text>
            </View>
            <Text
              style={[
                styles.addText,
                {
                  color: isDark ? colors.textMuted : colors.textSecondary,
                  fontSize: isPrimarySlot ? 13 : 11,
                },
              ]}
            >
              {isPrimarySlot ? 'Add Main Photo' : 'Add Photo'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.gridContainer}>
      {/* Top Row: 1 Large Primary (left) + 2 Slots (right column) */}
      <View style={styles.topRow}>
        {renderSlot(0, PRIMARY_WIDTH, PRIMARY_HEIGHT, true)}
        <View style={styles.sideColumn}>
          {renderSlot(1, SIDE_WIDTH, SIDE_HEIGHT, false)}
          {renderSlot(2, SIDE_WIDTH, SIDE_HEIGHT, false)}
        </View>
      </View>

      {/* Bottom Row: 3 Equal Slots */}
      <View style={styles.bottomRow}>
        {renderSlot(3, BOTTOM_SLOT_WIDTH, BOTTOM_SLOT_HEIGHT, false)}
        {renderSlot(4, BOTTOM_SLOT_WIDTH, BOTTOM_SLOT_HEIGHT, false)}
        {renderSlot(5, BOTTOM_SLOT_WIDTH, BOTTOM_SLOT_HEIGHT, false)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    paddingHorizontal: GRID_PADDING,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: GAP,
    gap: GAP,
  },
  sideColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: GAP,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: GAP,
  },
  slotContainer: {
    overflow: 'hidden',
  },
  filledCard: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptySlot: {
    width: '100%',
    height: '100%',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  plusText: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    includeFontPadding: false,
  },
  addText: {
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
  },
  primaryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  primaryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    includeFontPadding: false,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16,
    includeFontPadding: false,
  },
  setPrimaryButton: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  setPrimaryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    includeFontPadding: false,
  },
});

export default PhotoPicker;
