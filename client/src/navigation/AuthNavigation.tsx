/**
 * Authentication Stack Navigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Signin from '../screens/SignIn';
import Onboarding from '../screens/Onboarding';
import ProfileSetup from '../screens/ProfileSetup';
import { AuthStackParamList } from '../types/navigation';
import { devNav } from '../lib';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigation: React.FC = () => {
  const initialRouteName: keyof AuthStackParamList = devNav.hasSeenSplash()
    ? 'Onboarding'
    : 'Splash';

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={Signin} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;