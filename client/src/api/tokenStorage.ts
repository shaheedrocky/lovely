/**
 * Token Storage Manager
 * In-memory and extensible storage for JWT Access and Refresh tokens.
 * Prepared for AsyncStorage or Expo SecureStore in production.
 */

class TokenStorageManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private onUnauthorizedCallbacks: Array<() => void> = [];

  /**
   * Set new tokens
   */
  public setTokens(accessToken: string, refreshToken?: string): void {
    this.accessToken = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  /**
   * Retrieve active Access Token
   */
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Retrieve Refresh Token
   */
  public getRefreshToken(): string | null {
    return this.refreshToken;
  }

  /**
   * Clear all stored credentials
   */
  public clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  /**
   * Check if user is authenticated locally
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Register a listener for 401 / Unauthorized responses
   */
  public onUnauthorized(callback: () => void): () => void {
    this.onUnauthorizedCallbacks.push(callback);
    return () => {
      this.onUnauthorizedCallbacks = this.onUnauthorizedCallbacks.filter(
        cb => cb !== callback,
      );
    };
  }

  /**
   * Emit unauthorized event
   */
  public notifyUnauthorized(): void {
    this.clearTokens();
    this.onUnauthorizedCallbacks.forEach(cb => {
      try {
        cb();
      } catch {
        // Safe callback execution
      }
    });
  }
}

export const tokenStorage = new TokenStorageManager();
export default tokenStorage;
