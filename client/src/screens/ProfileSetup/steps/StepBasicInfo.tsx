/**
 * Profile Setup - Step 1: Basic Information
 * Name, Date of Birth, Gender selector, Short Bio with character counter.
 */

import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import AnimatedInput from '../../../components/ui/AnimatedInput';
import GenderSelector from '../../../components/ui/GenderSelector';
import ThemedButton from '../../../components/common/ThemedButton';
import { ProfileSetupData, Gender } from '../../../types/profile';

export interface StepBasicInfoProps {
  data: ProfileSetupData;
  onUpdate: (fields: Partial<ProfileSetupData>) => void;
  onNext: () => void;
}

export const StepBasicInfo: React.FC<StepBasicInfoProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format DOB as user types (DD / MM / YYYY)
  const handleDobChange = (text: string) => {
    // Keep only numbers
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = cleaned;

    if (cleaned.length > 2 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)} / ${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)} / ${cleaned.slice(2, 4)} / ${cleaned.slice(4, 8)}`;
    }

    onUpdate({ dateOfBirth: formatted });
    if (errors.dateOfBirth) {
      setErrors(prev => ({ ...prev, dateOfBirth: '' }));
    }
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (data.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!data.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Please enter your date of birth';
    } else if (data.dateOfBirth.replace(/[^0-9]/g, '').length < 8) {
      newErrors.dateOfBirth = 'Please enter complete date (DD / MM / YYYY)';
    }

    if (!data.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!data.bio.trim()) {
      newErrors.bio = 'Add a short bio to introduce yourself';
    } else if (data.bio.trim().length < 10) {
      newErrors.bio = 'Bio should be at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="px-5 pt-2 pb-9"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step Title Header */}
        <View className="mb-6">
          <Text className="mb-2 text-[26px] font-extrabold text-text-primary dark:text-text-primary-dark">
            Let's get to know you.
          </Text>
          <Text className="text-sm leading-[22px] text-text-secondary dark:text-text-secondary-dark">
            Share the basics about yourself so others can get a genuine glimpse
            into who you are.
          </Text>
        </View>

        {/* Input Fields */}
        <AnimatedInput
          label="Full Name"
          placeholder="e.g. Shaheed Rocky"
          value={data.fullName}
          error={errors.fullName}
          onChangeText={text => {
            onUpdate({ fullName: text });
            if (errors.fullName) {
              setErrors(prev => ({ ...prev, fullName: '' }));
            }
          }}
          autoCapitalize="words"
          leftIcon={<Text className="text-lg">👤</Text>}
        />

        <AnimatedInput
          label="Date of Birth"
          placeholder="DD / MM / YYYY"
          value={data.dateOfBirth}
          error={errors.dateOfBirth}
          onChangeText={handleDobChange}
          keyboardType="numeric"
          maxLength={14}
          leftIcon={<Text className="text-lg">🎂</Text>}
          helperText="You must be 18 or older to join Lovely"
        />

        <GenderSelector
          selectedGender={data.gender}
          error={errors.gender}
          onSelect={(gender: Gender) => {
            onUpdate({ gender });
            if (errors.gender) {
              setErrors(prev => ({ ...prev, gender: '' }));
            }
          }}
        />

        <AnimatedInput
          label="Short Bio"
          placeholder="Tell people a little about yourself, what you enjoy doing, or what makes you smile..."
          value={data.bio}
          error={errors.bio}
          onChangeText={text => {
            onUpdate({ bio: text });
            if (errors.bio) {
              setErrors(prev => ({ ...prev, bio: '' }));
            }
          }}
          multiline
          maxLength={250}
          showCharCount
        />

        {/* Bottom Continue Button */}
        <View className="mt-4">
          <ThemedButton
            title="Continue"
            variant="primary"
            size="lg"
            onPress={validateAndProceed}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepBasicInfo;
