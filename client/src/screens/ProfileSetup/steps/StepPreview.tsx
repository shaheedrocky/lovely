/**
 * Profile Setup - Step 5: Profile Preview
 * "Looking good!"
 * Realistic profile card display with Edit and Complete Profile buttons.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  Text,
  View,
} from 'react-native';
import ProfileCard from '../../../components/ui/ProfileCard';
import ThemedButton from '../../../components/common/ThemedButton';
import { ProfileSetupData } from '../../../types/profile';

export interface StepPreviewProps {
  data: ProfileSetupData;
  onEdit: () => void;
  onComplete: () => void;
  isSaving?: boolean;
}

export const StepPreview: React.FC<StepPreviewProps> = ({
  data,
  onEdit,
  onComplete,
  isSaving = false,
}) => {
  const entranceAnim = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(entranceAnim, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [entranceAnim, opacityAnim]);

  return (
    <ScrollView
      contentContainerClassName="px-5 pt-2 pb-9"
      showsVerticalScrollIndicator={false}
    >
      {/* Title Section */}
      <View className="mb-5">
        <Text className="mb-1.5 text-[26px] font-extrabold text-text-primary dark:text-text-primary-dark">
          Looking good! ✨
        </Text>
        <Text className="text-sm leading-[22px] text-text-secondary dark:text-text-secondary-dark">
          Here is how your profile will appear to potential matches on Lovely.
        </Text>
      </View>

      {/* The Profile Card */}
      <Animated.View
        style={{
          opacity: opacityAnim,
          transform: [{ scale: entranceAnim }],
        }}
      >
        <ProfileCard data={data} />
      </Animated.View>

      {/* Action Buttons */}
      <View className="mt-2 flex-row gap-3">
        <ThemedButton
          title="Edit Details"
          variant="secondary"
          size="lg"
          onPress={onEdit}
          style={{ flex: 1 }}
        />

        <ThemedButton
          title="Complete Profile 💖"
          variant="primary"
          size="lg"
          loading={isSaving}
          onPress={onComplete}
          style={{ flex: 1.4 }}
        />
      </View>
    </ScrollView>
  );
};

export default StepPreview;
