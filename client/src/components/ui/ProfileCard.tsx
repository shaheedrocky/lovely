/**
 * Luxury ProfileCard Preview Component
 * High-end dating profile representation with photo hero, verified badge, bio, and interest tags.
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { ProfileSetupData } from '../../types/profile';
import { INTERESTS_LIST, DATING_INTENT_OPTIONS } from '../../constants';

export interface ProfileCardProps {
  data: ProfileSetupData;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  const { colors, isDark, radius, shadows } = useTheme();

  // Find primary photo or first photo
  const primaryPhoto =
    data.photos.find(p => p.isPrimary)?.url ||
    data.photos[0]?.url ||
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

  // Map interest IDs to full items
  const matchedInterests = data.interests.map(id => {
    return (
      INTERESTS_LIST.find(item => item.id === id) || {
        id,
        name: id,
        icon: '✨',
      }
    );
  });

  const matchedIntent = DATING_INTENT_OPTIONS.find(
    i => i.id === data.datingIntent,
  );

  return (
    <View
      style={[
        styles.cardContainer,
        shadows.lg,
        {
          borderRadius: radius['3xl'],
          backgroundColor: isDark ? colors.card : colors.surface,
          borderColor: isDark ? colors.cardBorder : colors.cardBorder,
        },
      ]}
    >
      {/* Hero Photo with Gradient Fade & Verified Badge */}
      <View style={[styles.photoWrapper, { borderRadius: radius['3xl'] }]}>
        <Image
          source={{ uri: primaryPhoto }}
          style={styles.heroPhoto}
          resizeMode="cover"
        />

        {/* Top Floating Match Badge */}
        <View style={styles.topBadgeRow}>
          <View style={styles.matchScoreBadge}>
            <Text style={styles.matchScoreText}>💖 98% Match</Text>
          </View>
        </View>

        {/* Bottom Overlay Gradient Effect */}
        <View style={styles.photoBottomOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>
              {data.fullName || 'Lovely User'}
            </Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          </View>

          {data.location && (
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>📍 {data.location}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Profile Details Body */}
      <View style={styles.bodyPadding}>
        {/* Dating Intent Pill */}
        {matchedIntent && (
          <View
            style={[
              styles.intentBadge,
              {
                backgroundColor: isDark
                  ? 'rgba(255, 71, 126, 0.16)'
                  : 'rgba(255, 71, 126, 0.08)',
                borderColor: isDark ? colors.border : colors.primary[200],
              },
            ]}
          >
            <Text style={styles.intentIcon}>{matchedIntent.icon}</Text>
            <Text style={[styles.intentLabel, { color: colors.tint }]}>
              {matchedIntent.title}
            </Text>
          </View>
        )}

        {/* Bio Section */}
        {data.bio ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
              ABOUT ME
            </Text>
            <Text style={[styles.bioText, { color: colors.textPrimary }]}>
              {data.bio}
            </Text>
          </View>
        ) : null}

        {/* Interests Section */}
        {matchedInterests.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
              PASSIONS & INTERESTS
            </Text>
            <View style={styles.interestsRow}>
              {matchedInterests.map(item => (
                <View
                  key={item.id}
                  style={[
                    styles.interestPill,
                    {
                      borderRadius: radius.full,
                      backgroundColor: isDark
                        ? colors.surfaceElevated
                        : colors.backgroundSecondary,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.interestIcon}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.interestName,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Preferences Summary */}
        <View
          style={[
            styles.preferencesBox,
            {
              backgroundColor: isDark
                ? colors.surfaceElevated
                : colors.backgroundSoft,
              borderColor: colors.border,
              borderRadius: radius.xl,
            },
          ]}
        >
          <Text style={[styles.prefItem, { color: colors.textSecondary }]}>
            🎯 Interested in{' '}
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>
              {data.interestedIn === 'everyone'
                ? 'Everyone'
                : data.interestedIn === 'men'
                ? 'Men'
                : 'Women'}
            </Text>
          </Text>
          <Text style={[styles.prefItem, { color: colors.textSecondary }]}>
            📏 Within{' '}
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>
              {data.maxDistanceKm} km
            </Text>
          </Text>
          <Text style={[styles.prefItem, { color: colors.textSecondary }]}>
            🎂 Age Range:{' '}
            <Text style={{ fontWeight: '700', color: colors.textPrimary }}>
              {data.ageRange.min} — {data.ageRange.max}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  photoWrapper: {
    width: '100%',
    height: 380,
    position: 'relative',
    overflow: 'hidden',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  topBadgeRow: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  matchScoreBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  matchScoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    includeFontPadding: false,
  },
  photoBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginRight: 8,
    includeFontPadding: false,
  },
  verifiedBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  locationRow: {
    marginTop: 4,
  },
  locationText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
  bodyPadding: {
    padding: 20,
  },
  intentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    borderWidth: 1,
    marginBottom: 16,
  },
  intentIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  intentLabel: {
    fontSize: 13,
    fontWeight: '700',
    includeFontPadding: false,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
    includeFontPadding: false,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  interestIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  interestName: {
    fontSize: 12,
    fontWeight: '600',
    includeFontPadding: false,
  },
  preferencesBox: {
    padding: 14,
    borderWidth: 1,
    gap: 6,
    marginTop: 8,
  },
  prefItem: {
    fontSize: 13,
    includeFontPadding: false,
  },
});

export default ProfileCard;
