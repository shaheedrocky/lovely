import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = () => {
  return (
    <View className="flex-1 justify-between bg-white px-6 py-12">
      <View className="mt-8 items-center">
        <Text style={styles.brandText} className="text-7xl text-primary-700">
          Lovely
        </Text>
        <Text className="mt-2 text-center text-sm font-medium tracking-[3px] text-gray-500 uppercase">
          Where Hearts Find Their Match
        </Text>
      </View>

      <View className="items-center px-4">
        <View className="h-44 w-44 items-center justify-center rounded-full bg-primary-50">
          <Text className="text-6xl">💖</Text>
        </View>
        <Text className="mt-8 text-center text-2xl font-bold text-gray-800">
          Welcome to Lovely
        </Text>
        <Text className="mt-3 text-center text-sm leading-6 text-gray-500">
          Start your journey towards meaningful connections and genuine love.
        </Text>
      </View>

      <View className="gap-3">
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full items-center rounded-2xl bg-primary-700 py-4 shadow-sm"
        >
          <Text className="text-base font-semibold text-white">
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full items-center rounded-2xl border border-gray-200 bg-gray-50 py-4"
        >
          <Text className="text-base font-semibold text-gray-700">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  brandText: {
    fontFamily: 'Tangerine-Bold',
  },
});

export default Welcome;
