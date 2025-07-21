import { authService } from '../services/authService';
import { Token, Usuario } from '../types';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export class TokenManager {
  private static isRefreshing = false;
  private static refreshPromise: Promise<string | null> | null = null;

  static setTokens(token: Token): void {
    localStorage.setItem(TOKEN_KEY, token.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setUserData(userData: Usuario): void {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }

  static getUserData(): Usuario | null {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('[TokenManager] Error parsing user data:', error);
        localStorage.removeItem(USER_DATA_KEY);
      }
    }
    return null;
  }

  static clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  static async getValidAccessToken(): Promise<string | null> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    // If we're already refreshing, wait for that to complete
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    // Try to use the current access token first
    // If it fails with 401, the calling code will trigger a refresh
    return accessToken;
  }

  static async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      console.log('[TokenManager] No refresh token available');
      this.clearTokens();
      return null;
    }

    // If already refreshing, return the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh(refreshToken);

    try {
      const newAccessToken = await this.refreshPromise;
      return newAccessToken;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private static async performRefresh(refreshToken: string): Promise<string | null> {
    try {
      console.log('[TokenManager] Refreshing access token...');
      const response = await authService.refresh(refreshToken);
      
      if (response.data?.access_token) {
        // Update tokens in storage
        this.setTokens(response.data);
        console.log('[TokenManager] Token refreshed successfully');
        return response.data.access_token;
      } else {
        console.log('[TokenManager] No access token in refresh response');
        this.clearTokens();
        return null;
      }
    } catch (error) {
      console.error('[TokenManager] Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }

  static hasValidTokens(): boolean {
    return !!(this.getAccessToken() && this.getRefreshToken());
  }

  static hasUserData(): boolean {
    return !!this.getUserData();
  }

  /**
   * Decode JWT token to check expiration (optional utility)
   * Note: This is a basic implementation without verification
   */
  static isTokenExpired(token?: string): boolean {
    const accessToken = token || this.getAccessToken();
    if (!accessToken) return true;

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.error('[TokenManager] Error checking token expiration:', error);
      return true;
    }
  }

  /**
   * Proactively refresh token if it's close to expiration
   */
  static async ensureValidToken(): Promise<string | null> {
    const accessToken = this.getAccessToken();
    
    if (!accessToken) {
      return null;
    }

    // Check if token is expired or will expire soon (within 5 minutes)
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const fiveMinutesFromNow = currentTime + (5 * 60);

      if (payload.exp < fiveMinutesFromNow) {
        console.log('[TokenManager] Token expiring soon, refreshing...');
        return await this.refreshAccessToken();
      }

      return accessToken;
    } catch (error) {
      console.error('[TokenManager] Error checking token expiration:', error);
      return await this.refreshAccessToken();
    }
  }
} 