/**
 * Profile and Onboarding Data Types
 */

export type Gender = 'male' | 'female' | 'other';

export type InterestedIn = 'men' | 'women' | 'everyone';

export type DatingIntent =
  | 'relationship'
  | 'long_term'
  | 'casual'
  | 'friendship';

export interface PhotoSlot {
  id: string;
  url: string;
  isPrimary?: boolean;
}

export interface InterestItem {
  id: string;
  name: string;
  icon: string;
  category?: 'lifestyle' | 'activity' | 'creativity' | 'entertainment';
}

export interface AgeRange {
  min: number;
  max: number;
}

export interface ProfileSetupData {
  // Step 1: Basic Information
  fullName: string;
  dateOfBirth: string; // "DD / MM / YYYY"
  gender: Gender | '';
  bio: string;

  // Step 2: Photos (at least 2 photos required, max 6)
  photos: PhotoSlot[];

  // Step 3: Interests (at least 3 required)
  interests: string[];

  // Step 4: Dating Preferences
  interestedIn: InterestedIn;
  ageRange: AgeRange;
  maxDistanceKm: number;
  datingIntent: DatingIntent;

  // Derived / display fields
  location?: string;
  occupation?: string;
}

export const initialProfileData: ProfileSetupData = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  bio: '',
  photos: [],
  interests: [],
  interestedIn: 'everyone',
  ageRange: { min: 21, max: 32 },
  maxDistanceKm: 25,
  datingIntent: 'relationship',
  location: 'Chennai, India',
  occupation: 'Software Engineer',
};
