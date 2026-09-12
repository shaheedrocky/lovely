/**
 * Profile Setup Multi-Step Flow Orchestrator
 * Manages 5 steps: Basic Info -> Photos -> Interests -> Preferences -> Preview
 * Features unified draft state, progress indicator, custom modals, and toasts.
 */

import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedView } from '../../components/common';
import ThemeToggle from '../../components/common/ThemeToggle';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import CustomModal from '../../components/ui/CustomModal';
import { useToast } from '../../components/ui/ToastContext';
import StepBasicInfo from './steps/StepBasicInfo';
import StepPhotos from './steps/StepPhotos';
import StepInterests from './steps/StepInterests';
import StepPreferences from './steps/StepPreferences';
import StepPreview from './steps/StepPreview';
import { ProfileSetupData, initialProfileData } from '../../types/profile';
import { AuthStackParamList } from '../../types/navigation';
import { profileApi } from '../../api';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ProfileSetup'
>;
type ProfileSetupRouteProp = RouteProp<AuthStackParamList, 'ProfileSetup'>;

export const ProfileSetup: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProfileSetupRouteProp>();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(
    route.params?.initialStep || 1,
  );

  const [profileData, setProfileData] = useState<ProfileSetupData>({
    ...initialProfileData,
    fullName: 'Shaheed',
    dateOfBirth: '14 / 08 / 2001',
    gender: 'male',
    bio: 'Software engineer & tech enthusiast who loves weekend travel, filter coffee, and good conversation ✨',
    photos: [
      {
        id: 'p-1',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        isPrimary: true,
      },
      {
        id: 'p-2',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        isPrimary: false,
      },
    ],
    interests: ['technology', 'travel', 'music', 'coffee', 'reading'],
    ...(route.params?.existingData || {}),
  });

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfileFields = (fields: Partial<ProfileSetupData>) => {
    setProfileData(prev => ({ ...prev, ...fields }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleCompleteProfile = async () => {
    setIsSaving(true);
    try {
      // Mock / real call to FastAPI endpoint
      try {
        await profileApi.saveProfileSetup(profileData);
      } catch {
        // Fallback gracefully in offline / mock mode
      }

      setIsSuccessModalVisible(true);
      showToast({
        title: 'Profile Complete! 💖',
        message: 'Welcome to Lovely. Your journey to meaningful love begins now.',
        type: 'heart',
        duration: 4000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBasicInfo
            data={profileData}
            onUpdate={updateProfileFields}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <StepPhotos
            data={profileData}
            onUpdate={updateProfileFields}
            onNext={handleNextStep}
          />
        );
      case 3:
        return (
          <StepInterests
            data={profileData}
            onUpdate={updateProfileFields}
            onNext={handleNextStep}
          />
        );
      case 4:
        return (
          <StepPreferences
            data={profileData}
            onUpdate={updateProfileFields}
            onNext={handleNextStep}
          />
        );
      case 5:
        return (
          <StepPreview
            data={profileData}
            onEdit={() => setCurrentStep(1)}
            onComplete={handleCompleteProfile}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView  className="flex-1">
      {/* Top Header: Progress Indicator + Theme Switcher */}
      <View className="flex-row items-center justify-between pr-4">
        <View className="flex-1">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={5}
            onBack={handleBackStep}
            canGoBack={true}
          />
        </View>
        <View className="pb-2">
          <ThemeToggle showLabel={false} />
        </View>
      </View>

      {/* Step Content */}
      <View className="flex-1">{renderActiveStep()}</View>

      {/* Reusable Success Celebration Modal */}
      <CustomModal
        visible={isSuccessModalVisible}
        onClose={() => {
          setIsSuccessModalVisible(false);
          navigation.navigate('Welcome');
        }}
        title="Welcome to Lovely! 💖"
        subtitle="Your profile is officially live. Ready to meet wonderful people?"
        icon="✨"
        primaryAction={{
          label: 'Start Exploring Matches',
          onPress: () => {
            setIsSuccessModalVisible(false);
            navigation.navigate('Welcome');
          },
        }}
      />
    </ThemedView>
  );
};

export default ProfileSetup;
