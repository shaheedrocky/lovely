/**
 * Authentication API Endpoints
 * Ready for FastAPI backend
 */

import { api } from './client';
import { tokenStorage } from './tokenStorage';
import { ApiResponse, UserAuthResponse } from '../types/api';

export interface LoginPayload {
  email: string;
  password?: string;
  phone?: string;
  otp?: string;
}

export interface RegisterPayload {
  email: string;
  fullName: string;
  password?: string;
}

export const authApi = {
  /**
   * User login (Public - Without Token)
   */
  login: async (payload: LoginPayload): Promise<UserAuthResponse> => {
    const res = await api.publicPost<ApiResponse<UserAuthResponse>>(
      '/auth/login',
      payload,
    );
    if (res.data?.tokens?.accessToken) {
      tokenStorage.setTokens(
        res.data.tokens.accessToken,
        res.data.tokens.refreshToken,
      );
    }
    return res.data;
  },

  /**
   * User registration (Public - Without Token)
   */
  register: async (payload: RegisterPayload): Promise<UserAuthResponse> => {
    const res = await api.publicPost<ApiResponse<UserAuthResponse>>(
      '/auth/register',
      payload,
    );
    if (res.data?.tokens?.accessToken) {
      tokenStorage.setTokens(
        res.data.tokens.accessToken,
        res.data.tokens.refreshToken,
      );
    }
    return res.data;
  },

  /**
   * Refresh JWT token
   */
  refreshToken: async (): Promise<string> => {
    const refreshToken = tokenStorage.getRefreshToken();
    const res = await api.publicPost<ApiResponse<{ accessToken: string }>>(
      '/auth/refresh',
      { refreshToken },
    );
    tokenStorage.setTokens(res.data.accessToken);
    return res.data.accessToken;
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      tokenStorage.clearTokens();
    }
  },
};

export default authApi;
