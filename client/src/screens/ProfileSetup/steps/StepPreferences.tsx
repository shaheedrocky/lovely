/**
 * Profile Setup - Step 4: Dating Preferences
 * "What are you looking for?"
 * Interested in, Dual age slider, Distance slider, and Dating Intent cards.
 */

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import SelectionCard from '../../../components/ui/SelectionCard';
import {
  AgeRangeSlider,
  DistanceSlider,
} from '../../../components/ui/RangeSlider';
import ThemedButton from '../../../components/common/ThemedButton';
import {
  ProfileSetupData,
  InterestedIn,
  DatingIntent,
} from '../../../types/profile';
import { DATING_INTENT_OPTIONS } from '../../../constants';

export interface StepPreferencesProps {
  data: ProfileSetupData;
  onUpdate: (fields: Partial<ProfileSetupData>) => void;
  onNext: () => void;
}

const INTERESTED_IN_OPTIONS: Array<{
  id: InterestedIn;
  title: string;
  subtitle: string;
  icon: string;
}> = [
  {
    id: 'women',
    title: 'Women',
    subtitle: 'Looking to meet women',
    icon: '👩',
  },
  {
    id: 'men',
    title: 'Men',
    subtitle: 'Looking to meet men',
    icon: '👨',
  },
  {
    id: 'everyone',
    title: 'Everyone',
    subtitle: 'Open to meeting everyone',
    icon: '✨',
  },
];

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  return (
    <ScrollView
      contentContainerClassName="px-5 pt-2 pb-9"
      showsVerticalScrollIndicator={false}
    >
      {/* Title Header */}
      <View className="mb-5">
        <Text className="mb-2 text-[26px] font-extrabold text-text-primary dark:text-text-primary-dark">
          What are you looking for?
        </Text>
        <Text className="text-sm leading-[22px] text-text-secondary dark:text-text-secondary-dark">
          Help us find matches aligned with what your heart desires. You can
          adjust these preferences anytime.
        </Text>
      </View>

      {/* Section 1: Interested In */}
      <View className="mb-4">
        <Text className="mb-2.5 text-sm font-semibold text-text-secondary dark:text-text-secondary-dark">
          I'm Interested in
        </Text>
        {INTERESTED_IN_OPTIONS.map(opt => (
          <SelectionCard
            key={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            icon={opt.icon}
            selected={data.interestedIn === opt.id}
            onPress={() => onUpdate({ interestedIn: opt.id })}
          />
        ))}
      </View>

      {/* Section 2: Age Preference (Dual-range slider) */}
      <View className="mb-4">
        <AgeRangeSlider
          range={data.ageRange}
          onChange={range => onUpdate({ ageRange: range })}
        />
      </View>

      {/* Section 3: Distance */}
      <View className="mb-4">
        <DistanceSlider
          distanceKm={data.maxDistanceKm}
          onChange={dist => onUpdate({ maxDistanceKm: dist })}
        />
      </View>

      {/* Section 4: Dating Intent */}
      <View className="mb-4">
        <Text className="mb-2.5 text-sm font-semibold text-text-secondary dark:text-text-secondary-dark">
          My Dating Intent
        </Text>
        {DATING_INTENT_OPTIONS.map(opt => (
          <SelectionCard
            key={opt.id}
            title={opt.title}
            subtitle={opt.subtitle}
            icon={opt.icon}
            selected={data.datingIntent === opt.id}
            onPress={() => onUpdate({ datingIntent: opt.id as DatingIntent })}
          />
        ))}
      </View>

      {/* Bottom Continue Button */}
      <View className="mt-2.5">
        <ThemedButton
          title="Review My Profile"
          variant="primary"
          size="lg"
          onPress={onNext}
        />
      </View>
    </ScrollView>
  );
};

export default StepPreferences;
