import React, { useEffect, useRef, useCallback } from 'react';
import {
  View,
  Animated,
  Easing,
  Dimensions,
  Text,
  Platform,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Curated ambient particles configuration
// -----------------------------------------------------------------------------
interface ParticleConfig {
  x: number;
  sizeClass: string;
  maxOpacity: number;
  duration: number;
  delay: number;
  sway: number;
}

const PARTICLES: ParticleConfig[] = [
  { x: SCREEN_WIDTH * 0.12, sizeClass: 'text-sm', maxOpacity: 0.35, duration: 4200, delay: 0, sway: -14 },
  { x: SCREEN_WIDTH * 0.28, sizeClass: 'text-xl', maxOpacity: 0.45, duration: 4800, delay: 700, sway: 12 },
  { x: SCREEN_WIDTH * 0.46, sizeClass: 'text-xs', maxOpacity: 0.28, duration: 4400, delay: 1400, sway: -8 },
  { x: SCREEN_WIDTH * 0.65, sizeClass: 'text-2xl', maxOpacity: 0.42, duration: 5200, delay: 400, sway: 16 },
  { x: SCREEN_WIDTH * 0.82, sizeClass: 'text-base', maxOpacity: 0.32, duration: 4600, delay: 1100, sway: -12 },
  { x: SCREEN_WIDTH * 0.92, sizeClass: 'text-lg', maxOpacity: 0.25, duration: 5000, delay: 1800, sway: 10 },
];

const RIPPLE_COUNT = 3;

const Splash: React.FC = () => {
  const navigation = useNavigation<any>();
  const hasNavigated = useRef(false);

  // Screen-level exit fade
  const screenFadeAnim = useRef(new Animated.Value(1)).current;

  // Staggered entrance animations
  const emblemEntranceAnim = useRef(new Animated.Value(0)).current;
  const logoEntranceAnim = useRef(new Animated.Value(0)).current;
  const textEntranceAnim = useRef(new Animated.Value(0)).current;
  const footerEntranceAnim = useRef(new Animated.Value(0)).current;

  // Continuous rhythmic heartbeat
  const heartbeatAnim = useRef(new Animated.Value(1)).current;

  // Concentric sonar ripple waves
  const rippleAnims = useRef(
    Array.from({ length: RIPPLE_COUNT }, () => new Animated.Value(0)),
  ).current;

  // Ambient floating hearts
  const particleAnims = useRef(
    PARTICLES.map(() => new Animated.Value(0)),
  ).current;

  // ---------------------------------------------------------------------------
  // Navigation trigger
  // ---------------------------------------------------------------------------
  const handleProceed = useCallback(() => {
    if (hasNavigated.current) {
      return;
    }
    hasNavigated.current = true;

    Animated.timing(screenFadeAnim, {
      toValue: 0,
      duration: 350,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Welcome');
      } else if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Welcome');
      }
    });
  }, [navigation, screenFadeAnim]);

  // ---------------------------------------------------------------------------
  // Animation Orchestration
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const activeLoops: Animated.CompositeAnimation[] = [];

    // 0. Status Bar styling
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      const AndroidStatusBar = StatusBar as any;
      AndroidStatusBar.setBackgroundColor?.('transparent', true);
      AndroidStatusBar.setTranslucent?.(true);
    }

    // 1. Entrance Choreography
    Animated.parallel([
      // Emblem Spring Entrance
      Animated.timing(emblemEntranceAnim, {
        toValue: 1,
        duration: 750,
        easing: Easing.out(Easing.back(1.3)),
        useNativeDriver: true,
      }),

      // Logo Fade & Slide
      Animated.sequence([
        Animated.delay(260),
        Animated.timing(logoEntranceAnim, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Tagline & Subtitle Fade & Slide
      Animated.sequence([
        Animated.delay(520),
        Animated.timing(textEntranceAnim, {
          toValue: 1,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Subtle Footer Fade
      Animated.sequence([
        Animated.delay(800),
        Animated.timing(footerEntranceAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2. Cardiac Heartbeat Loop (lub-dub rhythm)
    const heartbeatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.16,
          duration: 150,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.04,
          duration: 120,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.22,
          duration: 170,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.0,
          duration: 280,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(850),
      ]),
    );

    // Start heartbeat after entrance spring settles
    const heartbeatTimeout = setTimeout(() => {
      heartbeatLoop.start();
      activeLoops.push(heartbeatLoop);
    }, 600);
    timeouts.push(heartbeatTimeout);

    // 3. Concentric Ripple Rings
    rippleAnims.forEach((anim, index) => {
      const rippleLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 2400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

      const delayTimeout = setTimeout(() => {
        rippleLoop.start();
        activeLoops.push(rippleLoop);
      }, 500 + index * 750);

      timeouts.push(delayTimeout);
    });

    // 4. Floating Ambient Hearts
    particleAnims.forEach((anim, index) => {
      const config = PARTICLES[index];
      const particleLoop = Animated.loop(
        Animated.sequence([
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

      const particleTimeout = setTimeout(() => {
        particleLoop.start();
        activeLoops.push(particleLoop);
      }, config.delay);

      timeouts.push(particleTimeout);
    });

    // 5. Automatic transition timer to Welcome screen
    const navigationTimeout = setTimeout(() => {
      handleProceed();
    }, 3100);
    timeouts.push(navigationTimeout);

    // Cleanup
    return () => {
      timeouts.forEach(clearTimeout);
      activeLoops.forEach(loop => loop.stop());
      heartbeatLoop.stop();
      emblemEntranceAnim.stopAnimation();
      logoEntranceAnim.stopAnimation();
      textEntranceAnim.stopAnimation();
      footerEntranceAnim.stopAnimation();
      screenFadeAnim.stopAnimation();
      rippleAnims.forEach(anim => anim.stopAnimation());
      particleAnims.forEach(anim => anim.stopAnimation());
    };
  }, [
    emblemEntranceAnim,
    footerEntranceAnim,
    handleProceed,
    heartbeatAnim,
    logoEntranceAnim,
    particleAnims,
    rippleAnims,
    screenFadeAnim,
    textEntranceAnim,
  ]);

  return (
    <Pressable className="flex-1" onPress={handleProceed}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        className="flex-1 items-center justify-center overflow-hidden bg-primary-700"
        style={{
          opacity: screenFadeAnim,
        }}
      >
        {/* Ambient Glowing Aura Discs */}
        <View
          pointerEvents="none"
          className="absolute -top-[10%] -left-[20%] h-[340px] w-[340px] rounded-full bg-primary-400/25"
        />
        <View
          pointerEvents="none"
          className="absolute -bottom-[8%] -right-[15%] h-[320px] w-[320px] rounded-full bg-primary-900/40"
        />
        <View
          pointerEvents="none"
          className="absolute top-[36%] h-60 w-60 rounded-full bg-white/[0.08]"
        />

        {/* Ambient Floating Hearts */}
        {PARTICLES.map((particle, index) => {
          const anim = particleAnims[index];

          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [SCREEN_HEIGHT * 0.85, -40],
          });

          const translateX = anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [particle.x, particle.x + particle.sway, particle.x],
          });

          const opacity = anim.interpolate({
            inputRange: [0, 0.15, 0.75, 1],
            outputRange: [0, particle.maxOpacity, particle.maxOpacity * 0.7, 0],
          });

          const scale = anim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.75, 1.1, 0.85],
          });

          const rotate = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-14deg', '14deg'],
          });

          return (
            <Animated.Text
              key={`particle-${index}`}
              pointerEvents="none"
              className={`absolute text-white font-semibold ${particle.sizeClass}`}
              style={{
                opacity,
                transform: [
                  { translateX },
                  { translateY },
                  { scale },
                  { rotate },
                ],
              }}
            >
              {'\u2665\uFE0E'}
            </Animated.Text>
          );
        })}

        {/* Central Stage */}
        <View className="w-full items-center justify-center px-6">
          {/* Concentric Ripple Waves */}
          <View
            pointerEvents="none"
            className="absolute -top-4 h-28 w-28 items-center justify-center"
          >
            {rippleAnims.map((anim, index) => {
              const scale = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 2.7],
              });

              const opacity = anim.interpolate({
                inputRange: [0, 0.25, 0.8, 1],
                outputRange: [0, 0.45, 0.12, 0],
              });

              return (
                <Animated.View
                  key={`ripple-${index}`}
                  className="absolute h-28 w-28 rounded-full border-[1.5px] border-white/40 bg-white/[0.06]"
                  style={{
                    opacity,
                    transform: [{ scale }],
                  }}
                />
              );
            })}
          </View>

          {/* Central Heart Emblem Badge */}
          <Animated.View
            className="items-center justify-center mb-1"
            style={{
              opacity: emblemEntranceAnim,
              transform: [
                {
                  scale: Animated.multiply(
                    emblemEntranceAnim,
                    heartbeatAnim,
                  ),
                },
              ],
            }}
          >
            <View className="h-[90px] w-[90px] items-center justify-center rounded-full border-[1.5px] border-white/40 bg-white/[0.16] shadow-xl shadow-white/30">
              <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-white/[0.22]">
                <Text
                  className="text-center text-[42px] leading-[48px] text-white"
                  style={styles.fontNoPadding}
                >
                  {'\u2665\uFE0E'}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Brand Logo "Lovely" */}
          <Animated.View
            className="mt-1.5 items-center justify-center px-4"
            style={{
              opacity: logoEntranceAnim,
              transform: [
                {
                  translateY: logoEntranceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 0],
                  }),
                },
                {
                  scale: logoEntranceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1],
                  }),
                },
              ],
            }}
          >
            <Text
              className="font-tangerine-bold px-6 py-1 text-center text-[90px] leading-[104px] text-white"
              style={styles.fontNoPadding}
            >
              Lovely
            </Text>
          </Animated.View>

          {/* Tagline & Subtitle */}
          <Animated.View
            className="mt-0.5 items-center justify-center"
            style={{
              opacity: textEntranceAnim,
              transform: [
                {
                  translateY: textEntranceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                  }),
                },
              ],
            }}
          >
            <Text className="text-center text-[13px] font-semibold tracking-[3.5px] text-white/95 uppercase">
              Where Hearts Find Their Match
            </Text>
            <View className="my-2.5 w-36 flex-row items-center justify-center">
              <View className="h-[1px] flex-1 bg-white/30" />
              <Text
                className="mx-2 text-[10px] text-white/80"
                style={styles.fontNoPadding}
              >
                {'\u2665\uFE0E'}
              </Text>
              <View className="h-[1px] flex-1 bg-white/30" />
            </View>
            <Text className="text-center text-[11px] font-normal tracking-[1.8px] text-white/70">
              Real People • Meaningful Love
            </Text>
          </Animated.View>
        </View>

        {/* Bottom Accent */}
        <Animated.View
          className="absolute bottom-10 items-center justify-center"
          style={{
            opacity: footerEntranceAnim,
          }}
        >
          <View className="flex-row items-center rounded-full border border-white/20 bg-white/[0.12] px-3.5 py-1.5">
            <View className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-300" />
            <Text className="text-[10px] font-semibold tracking-[1.8px] text-white/85 uppercase">
              GENUINE CONNECTIONS
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// -----------------------------------------------------------------------------
// Cross-platform font metrics helper
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  fontNoPadding: {
    includeFontPadding: false,
  },
});

export default Splash;