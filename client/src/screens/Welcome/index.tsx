import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ThemedView,
  ThemedText,
  ThemedButton,
  ThemeToggle,
} from '../../components';
import CustomModal from '../../components/ui/CustomModal';
import { useToast } from '../../components/ui/ToastContext';
import { fontSizes, useTheme } from '../../theme';
import { AuthStackParamList } from '../../types/navigation';
import VectorIcon from '../../components/common/VectorIcons';
import Config from 'react-native-config';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const Welcome: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { showToast } = useToast();

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignIn = () => {
    setIsSignInModalOpen(false);
    showToast({
      title: 'Welcome Back!',
      message: 'Signed in successfully. Navigating to your profile...',
      type: 'heart',
      duration: 3500,
    });
    navigation.navigate('ProfileSetup');
  };

  const isDev = Config?.NODE_ENV === 'development';

  return (
    <ThemedView className="flex-1 justify-between px-4 pb-2">
      {/* Top Header & Theme Switcher */}
      <View className="flex-row items-center justify-between pt-1">
        <View className="flex-row items-center gap-2">
          <View
            className={`h-2 w-2 rounded-full ${
              isDev ? 'bg-green-500' : 'bg-orange-500'
            }`}
          />
          <ThemedText variant="caption" color="muted">
            v1.0 PREMIUM
          </ThemedText>
        </View>
        <ThemeToggle />
      </View>

      {/* Brand Title & Tagline */}
      <View className="items-center">
        <ThemedText
          variant="brandTitle"
          color="brand"
          className="text-center"
        >
          Lovely
        </ThemedText>
        <ThemedText
          variant="tagline"
          color="muted"
          className="mt-1 text-center"
        >
          Where Hearts Find Their Match
        </ThemedText>
      </View>

      {/* Center Hero Illustration / Heart Badge */}
      <View className="items-center px-4">
        <View className="h-44 w-44 items-center justify-center rounded-full border-2 border-primary-200 bg-primary-50 animate-pulse dark:border-border-dark dark:bg-surface-dark-elevated">
          <VectorIcon
            type="Ionicons"
            name="heart"
            color={colors.textBrand}
            size={fontSizes['8xl']}
          />
        </View>

        <ThemedText variant="h2" className="mt-8 text-center">
          Welcome to Lovely
        </ThemedText>

        <ThemedText
          variant="body"
          color="secondary"
          align="center"
          className="mt-3 text-center leading-6"
        >
          Start your journey towards meaningful connections and genuine love.
        </ThemedText>
      </View>

      {/* Action Buttons */}
      <View className="gap-3.5 pb-1">
        <ThemedButton
          title="Create Account"
          variant="primary"
          size="lg"
          onPress={() => navigation.navigate('ProfileSetup')}
        />

        <ThemedButton
          title="Sign In"
          variant="secondary"
          size="lg"
          onPress={() => setIsSignInModalOpen(true)}
        />
      </View>

      {/* Sign In Custom Modal Demo */}
      <CustomModal
        visible={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        title="Sign In to Lovely"
        subtitle="Ready to reconnect with your matches?"
        icon={'\u2665\uFE0E'}
        primaryAction={{
          label: 'Continue as Shaheed',
          onPress: handleSignIn,
        }}
        secondaryAction={{
          label: 'Sign In with Email',
          onPress: () => {
            setIsSignInModalOpen(false);
            setTimeout(() => {
              navigation.navigate('SignIn');
            }, 50);
          },
        }}
      />
    </ThemedView>
  );
};

export default Welcome;
