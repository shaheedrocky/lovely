import React, { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemedView } from '../../components/common';
import ThemeToggle from '../../components/common/ThemeToggle';
import DiscoverSlide from './slides/DiscoverSlide';
import ConnectSlide from './slides/ConnectSlide';
import ConnectChatSlide from './slides/ConnectChatSlide';
import OnboardingPaging from './components/OnboardingPaging';
import { AuthStackParamList } from '../../types/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

export const Onboarding: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef<any>(null);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / SCREEN_WIDTH);
    if (page !== currentIndex) {
      setCurrentIndex(page);
    }
  };

  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleContinue = () => {
    if (currentIndex < 2) {
      goToSlide(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    navigation.replace('Welcome');
  };

  return (
    <ThemedView  className="flex-1 justify-between">
      {/* Top Header Row: Theme Switcher & Skip Button */}
      <View className="z-10 flex-row items-center justify-between px-6 pt-2 pb-1">
        <ThemeToggle showLabel={false} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSkip}
          className="px-3 py-1.5"
        >
          <Text className="text-sm font-semibold text-text-muted dark:text-text-muted-dark">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Carousel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        className="flex-1"
      >
        <DiscoverSlide isActive={currentIndex === 0} />
        <ConnectSlide isActive={currentIndex === 1} />
        <ConnectChatSlide isActive={currentIndex === 2} />
      </ScrollView>

      {/* Bottom Paging Dots & Continue Button */}
      <OnboardingPaging
        currentIndex={currentIndex}
        totalSlides={3}
        onContinue={handleContinue}
        onDotPress={goToSlide}
      />
    </ThemedView>
  );
};

export default Onboarding;
