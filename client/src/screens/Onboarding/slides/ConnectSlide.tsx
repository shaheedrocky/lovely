/**
 * Onboarding Slide 2: Connect
 * "Real connections start here."
 * Two profile cards sliding in towards each other, meeting with a pulsing heart.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Text,
  View,
} from 'react-native';
import { ONBOARDING_MATCH_CANDIDATES } from '../../../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ConnectSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  // Animations
  const leftCardTranslate = useRef(new Animated.Value(-120)).current;
  const rightCardTranslate = useRef(new Animated.Value(120)).current;
  const heartScale = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isActive) return;

    // Reset
    leftCardTranslate.setValue(-120);
    rightCardTranslate.setValue(120);
    heartScale.setValue(0);
    contentFade.setValue(0);

    // Staggered slide in
    Animated.sequence([
      Animated.parallel([
        Animated.spring(leftCardTranslate, {
          toValue: 0,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        }),
        Animated.spring(rightCardTranslate, {
          toValue: 0,
          friction: 7,
          tension: 45,
          useNativeDriver: true,
        }),
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Heart pop
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse heart
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    return () => {
      pulseLoop.stop();
    };
  }, [
    contentFade,
    heartScale,
    isActive,
    leftCardTranslate,
    pulseAnim,
    rightCardTranslate,
  ]);

  const { user1, user2 } = ONBOARDING_MATCH_CANDIDATES;

  return (
    <View className="flex-1 items-center justify-center px-7" style={{ width: SCREEN_WIDTH }}>
      {/* Animated Profile Cards Meeting Area */}
      <View className="relative mb-10 h-[270px] w-[290px] items-center justify-center">
        {/* Left Profile Card */}
        <Animated.View
          className="absolute left-2.5 z-10 h-[225px] w-[155px] rounded-2xl border-[1.5px] border-card-border bg-card-light p-2 shadow-lg dark:border-card-dark-border dark:bg-card-dark"
          style={{
            transform: [
              { translateX: leftCardTranslate },
              { rotate: '-6deg' },
            ],
          }}
        >
          <Image
            source={{ uri: user1.avatar }}
            className="h-[155px] w-full rounded-xl"
            resizeMode="cover"
          />
          <View className="px-1 py-1.5">
            <Text className="text-[13px] font-bold text-text-primary dark:text-text-primary-dark">
              {user1.name}, {user1.age}
            </Text>
            <Text className="mt-0.5 text-[11px] text-text-muted dark:text-text-muted-dark">
              📍 {user1.city}
            </Text>
          </View>
        </Animated.View>

        {/* Right Profile Card */}
        <Animated.View
          className="absolute right-2.5 z-20 h-[225px] w-[155px] rounded-2xl border-[1.5px] border-card-border bg-card-light p-2 shadow-lg dark:border-card-dark-border dark:bg-card-dark"
          style={{
            transform: [
              { translateX: rightCardTranslate },
              { rotate: '6deg' },
            ],
          }}
        >
          <Image
            source={{ uri: user2.avatar }}
            className="h-[155px] w-full rounded-xl"
            resizeMode="cover"
          />
          <View className="px-1 py-1.5">
            <Text className="text-[13px] font-bold text-text-primary dark:text-text-primary-dark">
              {user2.name}, {user2.age}
            </Text>
            <Text className="mt-0.5 text-[11px] text-text-muted dark:text-text-muted-dark">
              📍 {user2.city}
            </Text>
          </View>
        </Animated.View>

        {/* Center Match Heart Badge */}
        <Animated.View
          className="absolute z-30 h-14 w-14 items-center justify-center rounded-full border-[3px] border-white bg-primary-500 shadow-lg shadow-primary-500/40"
          style={{
            transform: [
              { scale: Animated.multiply(heartScale, pulseAnim) },
            ],
          }}
        >
          <Text className="text-2xl">💖</Text>
        </Animated.View>
      </View>

      {/* Staggered Text Entrance */}
      <Animated.View className="items-center px-3" style={{ opacity: contentFade }}>
        <View className="mb-4 rounded-full border border-primary-200 bg-primary-500/10 px-3.5 py-1.5 dark:border-border-dark dark:bg-primary-500/15">
          <Text className="text-[11px] font-extrabold tracking-widest text-primary-500 uppercase">
            MEANINGFUL MATCHES
          </Text>
        </View>

        <Text className="mb-3 text-center text-[28px] font-extrabold leading-9 text-text-primary dark:text-text-primary-dark">
          Real connections start here.
        </Text>

        <Text className="text-center text-sm leading-6 text-text-secondary dark:text-text-secondary-dark">
          Like profiles, match with someone special, and start a genuine,
          heartfelt conversation.
        </Text>
      </Animated.View>
    </View>
  );
};

export default ConnectSlide;
