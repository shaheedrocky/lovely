/**
 * Profile Setup - Step 2: Add Photos
 * "Show your best side."
 * 6-photo grid with primary badge, photo selector bottom sheet, and min 2 photo validation.
 */

import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PhotoPicker from '../../../components/ui/PhotoPicker';
import CustomBottomSheet from '../../../components/ui/CustomBottomSheet';
import ThemedButton from '../../../components/common/ThemedButton';
import { useToast } from '../../../components/ui/ToastContext';
import { ProfileSetupData, PhotoSlot } from '../../../types/profile';
import { SAMPLE_PHOTOS } from '../../../constants';

export interface StepPhotosProps {
  data: ProfileSetupData;
  onUpdate: (fields: Partial<ProfileSetupData>) => void;
  onNext: () => void;
}

export const StepPhotos: React.FC<StepPhotosProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const { showToast } = useToast();

  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>('');

  const handleOpenSlot = (index: number) => {
    setActiveSlotIndex(index);
    setIsSheetVisible(true);
  };

  const handleSelectMockPhoto = (url: string) => {
    const newPhotos = [...data.photos];
    const isFirstPhoto = newPhotos.length === 0;

    const newSlot: PhotoSlot = {
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      url,
      isPrimary: activeSlotIndex === 0 || isFirstPhoto,
    };

    if (activeSlotIndex < newPhotos.length) {
      // Replace existing
      newPhotos[activeSlotIndex] = newSlot;
    } else {
      // Append
      newPhotos.push(newSlot);
    }

    // Ensure slot 0 is primary
    if (newPhotos[0]) {
      newPhotos[0].isPrimary = true;
    }

    onUpdate({ photos: newPhotos });
    setIsSheetVisible(false);
    setValidationError('');
    showToast({
      title: 'Photo Added',
      message: 'Looking fabulous! Add more to stand out.',
      type: 'heart',
    });
  };

  const handleRemovePhoto = (id: string) => {
    const filtered = data.photos.filter(p => p.id !== id);
    if (filtered.length > 0) {
      filtered[0].isPrimary = true;
    }
    onUpdate({ photos: filtered });
  };

  const handleSetPrimary = (id: string) => {
    const updated = data.photos.map(p => ({
      ...p,
      isPrimary: p.id === id,
    }));
    // Move the primary photo to index 0
    const primaryIndex = updated.findIndex(p => p.id === id);
    if (primaryIndex > -1) {
      const [primaryItem] = updated.splice(primaryIndex, 1);
      updated.unshift(primaryItem);
    }
    onUpdate({ photos: updated });
    showToast({
      title: 'Primary Photo Updated',
      message: 'This photo will be shown first to your matches.',
      type: 'heart',
    });
  };

  const validateAndProceed = () => {
    if (data.photos.length < 2) {
      setValidationError('Please upload at least 2 photos to proceed.');
      showToast({
        title: 'More Photos Needed',
        message: 'Upload at least 2 photos to show your best self.',
        type: 'error',
      });
      return;
    }

    setValidationError('');
    onNext();
  };

  return (
    <ScrollView
      contentContainerClassName="pt-2 pb-9"
      showsVerticalScrollIndicator={false}
    >
      {/* Title Header */}
      <View className="mb-5 px-5">
        <Text className="mb-2 text-[26px] font-extrabold text-text-primary dark:text-text-primary-dark">
          Show your best side.
        </Text>
        <Text className="text-sm leading-[22px] text-text-secondary dark:text-text-secondary-dark">
          Add at least 2 photos to help people get to know you. The first photo
          will be your primary portrait.
        </Text>
      </View>

      {/* 6-Photo Grid */}
      <PhotoPicker
        photos={data.photos}
        onAddPhoto={handleOpenSlot}
        onRemovePhoto={handleRemovePhoto}
        onSetPrimary={handleSetPrimary}
      />

      {/* Validation error message */}
      {validationError ? (
        <Text className="mt-3 text-center text-[13px] font-semibold text-status-error">
          {validationError}
        </Text>
      ) : null}

      {/* Photo tips pill */}
      <View className="mx-5 mt-5 flex-row items-center rounded-xl border border-border-light bg-primary-500/10 p-3.5 dark:border-border-dark dark:bg-primary-500/15">
        <Text className="mr-2.5 text-lg">💡</Text>
        <Text className="flex-1 text-xs leading-[18px] text-text-secondary dark:text-text-secondary-dark">
          Profiles with at least 3 high-quality portraits receive 4x more
          meaningful conversations.
        </Text>
      </View>

      {/* Bottom Continue Button */}
      <View className="mt-6 px-5">
        <ThemedButton
          title={
            data.photos.length >= 2
              ? 'Continue'
              : `Add ${2 - data.photos.length} more photo${
                  2 - data.photos.length === 1 ? '' : 's'
                }`
          }
          variant="primary"
          size="lg"
          onPress={validateAndProceed}
        />
      </View>

      {/* Reusable Bottom Sheet Photo Selector */}
      <CustomBottomSheet
        visible={isSheetVisible}
        onClose={() => setIsSheetVisible(false)}
        title="Select a Profile Photo"
      >
        <View className="pb-4">
          <Text className="mb-4 text-[13px] text-text-secondary dark:text-text-secondary-dark">
            Choose one of our curated sample portraits to test your profile:
          </Text>

          <View className="flex-row flex-wrap justify-center gap-3">
            {SAMPLE_PHOTOS.map((url, idx) => (
              <TouchableOpacity
                key={`sample-${idx}`}
                activeOpacity={0.8}
                onPress={() => handleSelectMockPhoto(url)}
                className="h-24 w-24 overflow-hidden rounded-xl border-2 border-border-light dark:border-border-dark"
              >
                <Image source={{ uri: url }} className="h-full w-full" />
              </TouchableOpacity>
            ))}
          </View>

          <ThemedButton
            title="Cancel"
            variant="ghost"
            size="md"
            onPress={() => setIsSheetVisible(false)}
            className="mt-3"
          />
        </View>
      </CustomBottomSheet>
    </ScrollView>
  );
};

export default StepPhotos;
