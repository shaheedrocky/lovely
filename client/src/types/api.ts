/**
 * API Types for FastAPI Backend Integration
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
}

export interface UserAuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    isProfileComplete: boolean;
  };
  tokens: AuthTokens;
}
