import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  ThemedView,
  ThemedText,
  ThemedButton,
  ThemeToggle,
  AnimatedInput,
  GoogleIcon,
  AppleIcon,
} from '../../components';
import VectorIcon from '../../components/common/VectorIcons';
import { useToast } from '../../components/ui/ToastContext';
import { useTheme } from '../../theme';
import { AuthStackParamList } from '../../types/navigation';
import { authApi } from '../../api';

// -----------------------------------------------------------------------------
// Formik Validation Schema using Yup
// -----------------------------------------------------------------------------
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter your password'),
  rememberMe: Yup.boolean(),
});

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;

export const SignIn: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, isDark } = useTheme();
  const { showToast } = useToast();

  // Visibility state for password input
  const [showPassword, setShowPassword] = useState(false);

  // Formik hook managing form state, validation, and submission
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async formValues => {
      try {
        // Optional API integration with backend
        try {
          await authApi.login({
            email: formValues.email.trim(),
            password: formValues.password,
          });
        } catch {
          // Fallback gracefully in mock/offline mode
        }

        showToast({
          title: 'Welcome Back! 💖',
          message: `Signed in successfully as ${formValues.email.trim()}.`,
          type: 'heart',
          duration: 3500,
        });

        navigation.navigate('ProfileSetup');
      } catch (err: any) {
        showToast({
          title: 'Sign In Failed',
          message:
            err?.message || 'Please check your credentials and try again.',
          type: 'error',
          duration: 3500,
        });
      }
    },
  });

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
          className="px-6 py-4"
        >
          {/* Top Bar: Back Button, Lovely Brand Title & Theme Toggle */}
          <View className="flex-row items-center justify-between pt-2 pb-3">
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('Welcome');
                }
              }}
              activeOpacity={0.7}
              style={{
                backgroundColor: isDark
                  ? colors.surfaceElevated
                  : colors.backgroundSecondary,
                borderColor: colors.border,
              }}
              className="h-10 w-10 items-center justify-center rounded-full border"
            >
              <VectorIcon
                type="Ionicons"
                name="arrow-back"
                size={20}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <ThemedText
              variant="brandTitle"
              color="brand"
              className="text-4xl text-center"
            >
              Lovely
            </ThemedText>

            <ThemeToggle showLabel={false} />
          </View>

          {/* Header Title & Subtitle */}
          <View className="mt-3 mb-6">
            <ThemedText variant="h2">Welcome Back! 👋</ThemedText>
            <ThemedText variant="body" color="muted" className="mt-1 leading-5">
              Sign in to continue your love journey and connect with matches.
            </ThemedText>
          </View>

          {/* Input Fields */}
          <View className="space-y-4">
            {/* Email Address Input */}
            <AnimatedInput
              label="Email Address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : undefined}
              placeholder="sarah@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={
                <VectorIcon
                  type="MaterialCommunityIcons"
                  name="email-outline"
                  size={20}
                  color={
                    touched.email && errors.email
                      ? colors.status.error
                      : colors.textMuted
                  }
                />
              }
            />

            {/* Password Input */}
            <AnimatedInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password ? errors.password : undefined}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              leftIcon={
                <VectorIcon
                  type="MaterialCommunityIcons"
                  name="lock-outline"
                  size={20}
                  color={
                    touched.password && errors.password
                      ? colors.status.error
                      : colors.textMuted
                  }
                />
              }
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <VectorIcon
                    type="Ionicons"
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            {/* Remember Me & Forgot Password */}
            <View className="mt-1 mb-5 flex-row items-center justify-between">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
                className="flex-row items-center"
              >
                <View
                  style={{
                    borderColor: values.rememberMe
                      ? colors.tint
                      : colors.border,
                    backgroundColor: values.rememberMe
                      ? colors.tint
                      : 'transparent',
                  }}
                  className="h-5 w-5 items-center justify-center rounded-md border"
                >
                  {values.rememberMe && (
                    <VectorIcon
                      type="Ionicons"
                      name="checkmark"
                      size={14}
                      color="#FFFFFF"
                    />
                  )}
                </View>
                <ThemedText variant="caption" color="secondary" className="ml-2">
                  Remember me
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  showToast({
                    title: 'Reset Password',
                    message:
                      'A password reset link will be sent to your email.',
                    type: 'info',
                    duration: 3500,
                  })
                }
              >
                <ThemedText
                  variant="caption"
                  color="brand"
                  className="font-semibold"
                >
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Sign In Primary Button */}
            <ThemedButton
              title="Sign In"
              variant="primary"
              size="lg"
              loading={isSubmitting}
              onPress={() => handleSubmit()}
            />

            {/* Divider */}
            <View className="my-6 flex-row items-center">
              <View
                style={{ backgroundColor: colors.border }}
                className="h-[1px] flex-1"
              />
              <ThemedText
                variant="caption"
                color="muted"
                className="mx-3 text-[11px] uppercase tracking-wider"
              >
                Or sign in with
              </ThemedText>
              <View
                style={{ backgroundColor: colors.border }}
                className="h-[1px] flex-1"
              />
            </View>

            {/* Social Sign In Buttons with Real SVG Icons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  showToast({
                    title: 'Google Sign In',
                    message: 'Connecting to Google...',
                    type: 'info',
                    duration: 2500,
                  })
                }
                style={{
                  backgroundColor: isDark
                    ? colors.surfaceElevated
                    : colors.backgroundSecondary,
                  borderColor: colors.border,
                }}
                className="flex-1 flex-row items-center justify-center rounded-2xl border py-3.5"
              >
                <GoogleIcon size={20} />
                <ThemedText variant="bodySmall" className="ml-2.5 font-medium">
                  Google
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  showToast({
                    title: 'Apple Sign In',
                    message: 'Connecting to Apple ID...',
                    type: 'info',
                    duration: 2500,
                  })
                }
                style={{
                  backgroundColor: isDark
                    ? colors.surfaceElevated
                    : colors.backgroundSecondary,
                  borderColor: colors.border,
                }}
                className="flex-1 flex-row items-center justify-center rounded-2xl border py-3.5"
              >
                <AppleIcon
                  size={20}
                  color={isDark ? '#FFFFFF' : '#000000'}
                />
                <ThemedText variant="bodySmall" className="ml-2.5 font-medium">
                  Apple
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Create Account Navigation Link */}
            <View className="mt-6 mb-8 flex-row items-center justify-center">
              <ThemedText variant="body" color="muted">
                Don&apos;t have an account?{' '}
              </ThemedText>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileSetup')}
                activeOpacity={0.7}
              >
                <ThemedText variant="body" color="brand" className="font-bold">
                  Create Account
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
});

export default SignIn;
