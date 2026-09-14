import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const SignIn = () => {
  const navigation = useNavigation<any>();

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
    onSubmit: (formValues, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        Alert.alert(
          'Welcome Back! 💖',
          `Signed in successfully as ${formValues.email.trim()}.`,
          [
            {
              text: 'Continue',
              onPress: () => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              },
            },
          ]
        );
      }, 1500);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
        className="px-6 py-4"
      >
        {/* Top Bar: Back Button & Lovely Script Logo */}
        <View className="flex-row items-center justify-between pt-2 pb-4">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <Text className="text-lg font-bold text-gray-700">←</Text>
          </TouchableOpacity>

          <Text style={styles.brandText} className="text-4xl text-primary-700">
            Lovely
          </Text>

          {/* Spacer to keep brand text centered */}
          <View className="h-10 w-10" />
        </View>

        {/* Header Title & Subtitle */}
        <View className="mt-2 mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Welcome Back! 👋
          </Text>
          <Text className="mt-1 text-sm text-gray-500">
            Sign in to continue your love journey and connect with matches.
          </Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          {/* Email Address Input */}
          <View>
            <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-700">
              Email Address
            </Text>
            <View
              className={`flex-row items-center rounded-2xl border px-4 py-3 bg-gray-50 ${
                touched.email && errors.email
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-gray-200'
              }`}
            >
              <Text className="mr-2 text-base">✉️</Text>
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="sarah@example.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 text-base text-gray-800"
              />
            </View>
            {touched.email && errors.email && (
              <Text className="mt-1 text-xs text-red-500">{errors.email}</Text>
            )}
          </View>

          {/* Password Input */}
          <View className="mt-4">
            <Text className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-700">
              Password
            </Text>
            <View
              className={`flex-row items-center rounded-2xl border px-4 py-3 bg-gray-50 ${
                touched.password && errors.password
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-gray-200'
              }`}
            >
              <Text className="mr-2 text-base">🔒</Text>
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                className="flex-1 text-base text-gray-800"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
                className="p-1"
              >
                <Text className="text-sm">{showPassword ? '👁️' : '🙈'}</Text>
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text className="mt-1 text-xs text-red-500">
                {errors.password}
              </Text>
            )}
          </View>

          {/* Remember Me & Forgot Password */}
          <View className="mt-4 flex-row items-center justify-between">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFieldValue('rememberMe', !values.rememberMe)}
              className="flex-row items-center"
            >
              <View
                className={`h-5 w-5 items-center justify-center rounded-md border ${
                  values.rememberMe
                    ? 'border-primary-700 bg-primary-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {values.rememberMe && (
                  <Text className="text-xs text-white">✓</Text>
                )}
              </View>
              <Text className="ml-2 text-xs text-gray-600">Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                Alert.alert(
                  'Reset Password',
                  'A password reset link will be sent to your email.'
                )
              }
            >
              <Text className="text-xs font-semibold text-primary-700">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Primary Button */}
          <TouchableOpacity
            onPress={() => handleSubmit()}
            activeOpacity={0.8}
            disabled={isSubmitting}
            className="mt-6 w-full items-center justify-center rounded-2xl bg-primary-700 py-4 shadow-sm"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-6 flex-row items-center">
            <View className="flex-1 border-t border-gray-200" />
            <Text className="mx-3 text-xs uppercase tracking-wider text-gray-400">
              Or sign in with
            </Text>
            <View className="flex-1 border-t border-gray-200" />
          </View>

          {/* Social Sign In Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 py-3.5"
            >
              <Text className="mr-2 text-base">🌐</Text>
              <Text className="text-sm font-medium text-gray-700">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 py-3.5"
            >
              <Text className="mr-2 text-base">🍎</Text>
              <Text className="text-sm font-medium text-gray-700">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Create Account Navigation Link */}
          <View className="mt-6 mb-8 flex-row justify-center items-center">
            <Text className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateAccount')}
              activeOpacity={0.7}
            >
              <Text className="text-sm font-bold text-primary-700">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  brandText: {
    fontFamily: 'Tangerine-Bold',
  },
});

export default SignIn;
