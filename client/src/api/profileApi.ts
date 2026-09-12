/**
 * User Profile API Endpoints
 * Supports profile setup, photos, interests, preferences (FastAPI ready)
 */

import { api } from './client';
import { ApiResponse } from '../types/api';
import { ProfileSetupData, PhotoSlot } from '../types/profile';

export const profileApi = {
  /**
   * Fetch current authenticated user's profile
   */
  getProfile: async (): Promise<ProfileSetupData> => {
    const res = await api.get<ApiResponse<ProfileSetupData>>('/users/me/profile');
    return res.data;
  },

  /**
   * Complete or update entire profile setup flow
   */
  saveProfileSetup: async (
    data: ProfileSetupData,
  ): Promise<ProfileSetupData> => {
    const res = await api.put<ApiResponse<ProfileSetupData>>(
      '/users/me/profile-setup',
      data,
    );
    return res.data;
  },

  /**
   * Upload user photo (Multipart / Form-Data)
   */
  uploadPhoto: async (formData: FormData): Promise<PhotoSlot> => {
    const res = await api.post<ApiResponse<PhotoSlot>>(
      '/users/me/photos',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  },

  /**
   * Delete photo
   */
  deletePhoto: async (photoId: string): Promise<void> => {
    await api.delete(`/users/me/photos/${photoId}`);
  },

  /**
   * Set primary photo
   */
  setPrimaryPhoto: async (photoId: string): Promise<void> => {
    await api.patch(`/users/me/photos/${photoId}/primary`);
  },

  /**
   * Update user interests
   */
  updateInterests: async (interests: string[]): Promise<string[]> => {
    const res = await api.put<ApiResponse<string[]>>('/users/me/interests', {
      interests,
    });
    return res.data;
  },

  /**
   * Update dating preferences
   */
  updatePreferences: async (
    preferences: Pick<
      ProfileSetupData,
      'interestedIn' | 'ageRange' | 'maxDistanceKm' | 'datingIntent'
    >,
  ): Promise<void> => {
    await api.put('/users/me/preferences', preferences);
  },
};

export default profileApi;
