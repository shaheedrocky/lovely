import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';

const RouteWrapper = () => {
  return (
    <NavigationContainer >
      <AuthNavigation />
    </NavigationContainer>
  )
}

export default RouteWrapper