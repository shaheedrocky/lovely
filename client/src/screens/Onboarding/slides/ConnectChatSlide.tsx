/**
 * Onboarding Slide 3: Connect & Chat
 * "Your story starts with a match."
 * Two avatars, progressive connection line, floating hearts, and chat bubble.
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

export const ConnectChatSlide: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  // Animations
  const avatarScale = useRef(new Animated.Value(0)).current;
  const lineProgress = useRef(new Animated.Value(0)).current;
  const chatBubbleFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const pulseHeart = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isActive) return;

    // Reset
    avatarScale.setValue(0);
    lineProgress.setValue(0);
    chatBubbleFade.setValue(0);
    contentFade.setValue(0);

    // Sequence
    Animated.sequence([
      // 1. Avatars pop in
      Animated.parallel([
        Animated.spring(avatarScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // 2. Connection line draws
      Animated.timing(lineProgress, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      // 3. Chat bubble springs up
      Animated.spring(chatBubbleFade, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse loop on center heart
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseHeart, {
          toValue: 1.2,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseHeart, {
          toValue: 1.0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [
    avatarScale,
    chatBubbleFade,
    contentFade,
    isActive,
    lineProgress,
    pulseHeart,
  ]);

  const { user1, user2 } = ONBOARDING_MATCH_CANDIDATES;

  const lineWidth = lineProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 110],
  });

  return (
    <View className="flex-1 items-center justify-center px-7" style={{ width: SCREEN_WIDTH }}>
      {/* Visual Area */}
      <View className="relative mb-10 h-[270px] w-[300px] items-center justify-center">
        {/* Avatars and Connection Line Row */}
        <View className="mb-6 flex-row items-center justify-center">
          {/* Avatar 1 */}
          <Animated.View
            className="h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[2.5px] border-primary-500 bg-white p-0.5 shadow-md"
            style={{
              transform: [{ scale: avatarScale }],
            }}
          >
            <Image
              source={{ uri: user1.avatar }}
              className="h-full w-full rounded-full"
              resizeMode="cover"
            />
          </Animated.View>

          {/* Connection Line Container */}
          <View className="relative -mx-1 h-1 w-28 items-center justify-center bg-primary-500/20">
            <Animated.View
              className="absolute left-0 h-full bg-primary-500"
              style={{
                width: lineWidth,
              }}
            />
            {/* Center Heart on Line */}
            <Animated.View
              className="z-10 h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-primary-500 bg-surface-light dark:bg-surface-dark-elevated"
              style={{
                transform: [{ scale: pulseHeart }],
              }}
            >
              <Text className="text-sm">💌</Text>
            </Animated.View>
          </View>

          {/* Avatar 2 */}
          <Animated.View
            className="h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[2.5px] border-primary-500 bg-white p-0.5 shadow-md"
            style={{
              transform: [{ scale: avatarScale }],
            }}
          >
            <Image
              source={{ uri: user2.avatar }}
              className="h-full w-full rounded-full"
              resizeMode="cover"
            />
          </Animated.View>
        </View>

        {/* Chat Message Bubble */}
        <Animated.View
          className="max-w-[290px] flex-row items-center rounded-2xl border-[1.5px] border-card-border bg-card-light px-4 py-3 shadow-md dark:border-card-dark-border dark:bg-card-dark"
          style={{
            opacity: chatBubbleFade,
            transform: [
              {
                translateY: chatBubbleFade.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 0],
                }),
              },
            ],
          }}
        >
          <Text className="mr-2.5 text-xl">💬</Text>
          <View className="flex-1">
            <Text className="mb-0.5 text-[11px] font-bold text-primary-500">
              {user2.name} sent a message:
            </Text>
            <Text className="text-[13px] font-medium text-text-primary dark:text-text-primary-dark">
              "Hey there! Loved your travel photos ✨"
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Staggered Text Entrance */}
      <Animated.View className="items-center px-3" style={{ opacity: contentFade }}>
        <View className="mb-4 rounded-full border border-primary-200 bg-primary-500/10 px-3.5 py-1.5 dark:border-border-dark dark:bg-primary-500/15">
          <Text className="text-[11px] font-extrabold tracking-widest text-primary-500 uppercase">
            SEAMLESS CONVERSATIONS
          </Text>
        </View>

        <Text className="mb-3 text-center text-[28px] font-extrabold leading-9 text-text-primary dark:text-text-primary-dark">
          Your story starts with a match.
        </Text>

        <Text className="text-center text-sm leading-6 text-text-secondary dark:text-text-secondary-dark">
          Find your match and turn a simple hello into something unforgettable
          and meaningful.
        </Text>
      </Animated.View>
    </View>
  );
};

export default ConnectChatSlide;
