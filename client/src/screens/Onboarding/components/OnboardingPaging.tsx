import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import ThemedButton from '../../../components/common/ThemedButton';

export interface OnboardingPagingProps {
  currentIndex: number;
  totalSlides: number;
  onContinue: () => void;
  onDotPress: (index: number) => void;
}

export const OnboardingPaging: React.FC<OnboardingPagingProps> = ({
  currentIndex,
  totalSlides,
  onContinue,
  onDotPress,
}) => {
  const isLast = currentIndex === totalSlides - 1;

  return (
    <View className="w-full items-center px-6 pb-7">
      {/* Pagination Dots */}
      <View className="mb-5 flex-row items-center justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <TouchableOpacity
              key={`dot-${idx}`}
              activeOpacity={0.7}
              onPress={() => onDotPress(idx)}
              className={`h-2 rounded-full ${
                isActive
                  ? 'w-6 bg-primary-500'
                  : 'w-2 bg-border-light dark:bg-border-dark'
              }`}
            />
          );
        })}
      </View>

      {/* Main Action Button */}
      <View className="w-full">
        <ThemedButton
          title={isLast ? 'Get Started  ✨' : 'Continue'}
          variant="primary"
          size="lg"
          onPress={onContinue}
        />
      </View>
    </View>
  );
};

export default OnboardingPaging;
