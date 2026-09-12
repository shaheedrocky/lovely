/**
 * Navigation Types and Screen Param Lists
 */

import { ProfileSetupData } from './profile';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Welcome: undefined;
  CreateAccount: undefined;
  Dashboard: undefined;
  ProfileSetup: {
    initialStep?: number;
    existingData?: Partial<ProfileSetupData>;
  } | undefined;
  Main: undefined;
};

export type RootStackParamList = AuthStackParamList;
