/**
 * Profile Setup - Step 3: Interests
 * "What are you into?"
 * Selectable interest chips with spring scale animation, checkmark, and min 3 selection.
 */

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import InterestChip from '../../../components/ui/InterestChip';
import ThemedButton from '../../../components/common/ThemedButton';
import { useToast } from '../../../components/ui/ToastContext';
import { ProfileSetupData } from '../../../types/profile';
import { INTERESTS_LIST } from '../../../constants';

export interface StepInterestsProps {
  data: ProfileSetupData;
  onUpdate: (fields: Partial<ProfileSetupData>) => void;
  onNext: () => void;
}

export const StepInterests: React.FC<StepInterestsProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const { showToast } = useToast();

  const [error, setError] = useState<string>('');

  const selectedCount = data.interests.length;

  const handleToggleInterest = (id: string) => {
    let updated: string[];
    if (data.interests.includes(id)) {
      updated = data.interests.filter(i => i !== id);
    } else {
      if (data.interests.length >= 8) {
        showToast({
          title: 'Maximum Limit Reached',
          message: 'You can select up to 8 interests to keep your profile focused.',
          type: 'info',
        });
        return;
      }
      updated = [...data.interests, id];
    }

    onUpdate({ interests: updated });
    if (updated.length >= 3) {
      setError('');
    }
  };

  const validateAndProceed = () => {
    if (data.interests.length < 3) {
      setError('Please choose at least 3 interests to help us find great matches.');
      showToast({
        title: 'More Interests Needed',
        message: 'Select at least 3 interests to continue.',
        type: 'error',
      });
      return;
    }
    setError('');
    onNext();
  };

  return (
    <ScrollView
      contentContainerClassName="px-5 pt-2 pb-9"
      showsVerticalScrollIndicator={false}
    >
      {/* Title Header with Selection Counter */}
      <View className="mb-6">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-[26px] font-extrabold text-text-primary dark:text-text-primary-dark">
            What are you into?
          </Text>
          <View className="rounded-full border border-primary-500 bg-primary-500/10 px-2.5 py-1 dark:bg-primary-500/15">
            <Text className="text-xs font-bold text-primary-500">
              {selectedCount} selected
            </Text>
          </View>
        </View>

        <Text className="text-sm leading-[22px] text-text-secondary dark:text-text-secondary-dark">
          Pick a few things that make you, you. Choose at least 3 to connect over
          shared passions.
        </Text>
      </View>

      {/* Chips Cloud */}
      <View className="mb-4 flex-row flex-wrap">
        {INTERESTS_LIST.map(item => {
          const isSelected = data.interests.includes(item.id);
          return (
            <InterestChip
              key={item.id}
              item={item}
              selected={isSelected}
              onToggle={() => handleToggleInterest(item.id)}
            />
          );
        })}
      </View>

      {/* Error text */}
      {error ? (
        <Text className="mb-3 text-center text-[13px] font-semibold text-status-error">
          {error}
        </Text>
      ) : null}

      {/* Bottom Button */}
      <View className="mt-4">
        <ThemedButton
          title={
            selectedCount >= 3
              ? 'Continue'
              : `Select ${3 - selectedCount} more interest${
                  3 - selectedCount === 1 ? '' : 's'
                }`
          }
          variant="primary"
          size="lg"
          onPress={validateAndProceed}
        />
      </View>
    </ScrollView>
  );
};

export default StepInterests;
