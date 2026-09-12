/**
 * Onboarding Slide 1: Discover
 * "Meet someone who gets you."
 * Abstract romantic illustration, floating heart particles, staggered animations.
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PARTICLES = [
  { x: 30, duration: 4200, delay: 0, size: 14, sway: -12 },
  { x: 100, duration: 5100, delay: 600, size: 18, sway: 16 },
  { x: 180, duration: 4600, delay: 1200, size: 12, sway: -10 },
  { x: 250, duration: 4900, delay: 400, size: 20, sway: 14 },
  { x: 310, duration: 4400, delay: 900, size: 16, sway: -14 },
];

export const DiscoverSlide: React.FC<{ isActive: boolean }> = ({ isActive }) => {

  // Animations
  const contentFade = useRef(new Animated.Value(0)).current;
  const illustrationScale = useRef(new Animated.Value(0.9)).current;
  const textTranslate = useRef(new Animated.Value(20)).current;

  // Pulse & Heartbeat
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Particle animations
  const particleAnims = useRef(
    PARTICLES.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    if (!isActive) return;

    // Reset & Trigger Staggered Entrance
    contentFade.setValue(0);
    illustrationScale.setValue(0.9);
    textTranslate.setValue(20);

    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(illustrationScale, {
        toValue: 1,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation loop
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();

    // Ambient floating particles loop
    const activeLoops = particleAnims.map((anim, index) => {
      const config = PARTICLES[index];
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(config.delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: config.duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return loop;
    });

    return () => {
      pulseLoop.stop();
      activeLoops.forEach(l => l.stop());
    };
  }, [
    contentFade,
    illustrationScale,
    isActive,
    particleAnims,
    pulseAnim,
    textTranslate,
  ]);

  return (
    <View className="flex-1 items-center justify-center px-7" style={{ width: SCREEN_WIDTH }}>
      {/* Abstract Romantic Illustration */}
      <View className="relative mb-10 h-72 w-72 items-center justify-center">
        {/* Ambient Glowing Aura Rings */}
        <Animated.View
          className="absolute h-64 w-64 rounded-full bg-primary-500/10 dark:bg-primary-500/15"
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        />
        <View className="absolute h-48 w-48 rounded-full bg-secondary-500/10 dark:bg-secondary-500/15" />

        {/* Floating Heart Particles */}
        {PARTICLES.map((p, idx) => {
          const anim = particleAnims[idx];
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [180, -40],
          });
          const translateX = anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [p.x, p.x + p.sway, p.x],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: [0, 0.6, 0.5, 0],
          });

          return (
            <Animated.Text
              key={`particle-${idx}`}
              className="absolute left-0 top-7 text-primary-500"
              style={{
                fontSize: p.size,
                opacity,
                transform: [{ translateX }, { translateY }],
              }}
            >
              ♥
            </Animated.Text>
          );
        })}

        {/* Center Romantic Compass Emblem */}
        <Animated.View
          className="h-36 w-36 items-center justify-center rounded-full border-2 border-primary-100 bg-surface-light shadow-lg shadow-primary-500/20 dark:border-border-dark dark:bg-surface-dark-elevated"
          style={{
            transform: [{ scale: illustrationScale }],
          }}
        >
          <View className="h-28 w-28 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
            <Text className="absolute right-3.5 top-2 text-lg">✨</Text>
            <Text className="text-5xl">💖</Text>
          </View>
        </Animated.View>
      </View>

      {/* Staggered Text Entrance */}
      <Animated.View
        className="items-center px-3"
        style={{
          opacity: contentFade,
          transform: [{ translateY: textTranslate }],
        }}
      >
        <View className="mb-4 rounded-full border border-primary-200 bg-primary-500/10 px-3.5 py-1.5 dark:border-border-dark dark:bg-primary-500/15">
          <Text className="text-[11px] font-extrabold tracking-widest text-primary-500 uppercase">
            DISCOVER COMPATIBILITY
          </Text>
        </View>

        <Text className="mb-3 text-center text-[28px] font-extrabold leading-9 text-text-primary dark:text-text-primary-dark">
          Meet someone who gets you.
        </Text>

        <Text className="text-center text-sm leading-6 text-text-secondary dark:text-text-secondary-dark">
          Discover interesting people who share your interests, passions, and
          genuine vibe.
        </Text>
      </Animated.View>
    </View>
  );
};

export default DiscoverSlide;
