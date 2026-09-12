/**
 * Reusable Axios Client Architecture
 * Dual clients:
 *  1. `apiClient` - Authenticated with automatic Bearer Token injection & 401 handling
 *  2. `publicApiClient` - Unauthenticated for public / auth endpoints
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from './tokenStorage';
import { ApiError } from '../types/api';

// Configurable base URL for FastAPI backend
export const DEFAULT_API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Common configuration
 */
const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL: DEFAULT_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

/**
 * Unauthenticated client (Without Token)
 * Use for login, signup, password reset, public app config.
 */
export const publicApiClient: AxiosInstance = axios.create(defaultAxiosConfig);

/**
 * Authenticated client (With Token)
 * Automatically attaches Authorization header and checks for token expiry.
 */
export const apiClient: AxiosInstance = axios.create(defaultAxiosConfig);

// -----------------------------------------------------------------------------
// Request Interceptor: Attach Bearer Token to apiClient
// -----------------------------------------------------------------------------
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// -----------------------------------------------------------------------------
// Response Interceptors: Centralized Error Formatting & 401 Handling
// -----------------------------------------------------------------------------
const handleResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const handleResponseError = (error: AxiosError<any>) => {
  const formattedError: ApiError = {
    message: 'An unexpected network error occurred.',
    statusCode: error.response?.status,
  };

  if (error.response) {
    // Server responded with non-2xx status
    const data = error.response.data;
    if (typeof data === 'string') {
      formattedError.message = data;
    } else if (data?.message) {
      formattedError.message = data.message;
    } else if (data?.detail) {
      // Common FastAPI error format: { detail: "..." }
      formattedError.message =
        typeof data.detail === 'string'
          ? data.detail
          : JSON.stringify(data.detail);
    }

    if (data?.errors) {
      formattedError.errors = data.errors;
    }

    // 401 Unauthorized handling
    if (error.response.status === 401) {
      tokenStorage.notifyUnauthorized();
    }
  } else if (error.request) {
    // Request was made but no response received
    formattedError.message =
      'Unable to connect to the server. Please check your internet connection.';
  }

  return Promise.reject(formattedError);
};

publicApiClient.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);

apiClient.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError,
);

// -----------------------------------------------------------------------------
// Type-safe convenience helper methods
// -----------------------------------------------------------------------------
export const api = {
  // Authenticated requests
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.get(url, config);
    return response as unknown as T;
  },

  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.post(url, data, config);
    return response as unknown as T;
  },

  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.put(url, data, config);
    return response as unknown as T;
  },

  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.patch(url, data, config);
    return response as unknown as T;
  },

  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await apiClient.delete(url, config);
    return response as unknown as T;
  },

  // Public (Without token) requests
  publicGet: async <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await publicApiClient.get(url, config);
    return response as unknown as T;
  },

  publicPost: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await publicApiClient.post(url, data, config);
    return response as unknown as T;
  },
};

export default api;
