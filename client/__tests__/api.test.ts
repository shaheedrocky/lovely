/**
 * Unit Tests for Reusable Axios Client & Token Storage
 */

import { tokenStorage, publicApiClient, apiClient, DEFAULT_API_BASE_URL } from '../src/api';

describe('Axios Network Architecture & Token Storage', () => {
  beforeEach(() => {
    tokenStorage.clearTokens();
  });

  describe('TokenStorageManager', () => {
    it('should initially have null tokens and be unauthenticated', () => {
      expect(tokenStorage.getAccessToken()).toBeNull();
      expect(tokenStorage.getRefreshToken()).toBeNull();
      expect(tokenStorage.isAuthenticated()).toBe(false);
    });

    it('should store and retrieve access and refresh tokens', () => {
      tokenStorage.setTokens('mock-access-token-123', 'mock-refresh-token-456');
      expect(tokenStorage.getAccessToken()).toBe('mock-access-token-123');
      expect(tokenStorage.getRefreshToken()).toBe('mock-refresh-token-456');
      expect(tokenStorage.isAuthenticated()).toBe(true);
    });

    it('should clear tokens upon logout / clearTokens', () => {
      tokenStorage.setTokens('mock-token');
      expect(tokenStorage.isAuthenticated()).toBe(true);
      tokenStorage.clearTokens();
      expect(tokenStorage.getAccessToken()).toBeNull();
      expect(tokenStorage.isAuthenticated()).toBe(false);
    });

    it('should notify unauthorized listeners on 401 trigger', () => {
      const mockUnauthorizedHandler = jest.fn();
      const unsubscribe = tokenStorage.onUnauthorized(mockUnauthorizedHandler);

      tokenStorage.setTokens('expired-token');
      tokenStorage.notifyUnauthorized();

      expect(mockUnauthorizedHandler).toHaveBeenCalledTimes(1);
      expect(tokenStorage.isAuthenticated()).toBe(false);

      unsubscribe();
    });
  });

  describe('Axios Dual-Client Configuration', () => {
    it('should configure publicApiClient and apiClient with base URL', () => {
      expect(publicApiClient.defaults.baseURL).toBe(DEFAULT_API_BASE_URL);
      expect(apiClient.defaults.baseURL).toBe(DEFAULT_API_BASE_URL);
    });

    it('should configure json content-type headers', () => {
      expect(publicApiClient.defaults.headers['Content-Type']).toBe('application/json');
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
    });
  });
});
