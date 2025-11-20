export * from '../../../shared/constants/index.js';

export const API_BASE_URL = '/api';

export const API_ENDPOINTS = {
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_CONTRIBUTION: `${API_BASE_URL}/contribution/update`,
  RETIREMENT_PROJECTION: `${API_BASE_URL}/projection/retirement`
} as const;

export const UI_CONSTANTS = {
  DEBOUNCE_DELAY_MS: 300,
  TOAST_DURATION_MS: 3000,
  ANIMATION_DURATION_MS: 200
} as const;

export const CHART_COLORS = {
  PRIMARY: '#2D5BFF',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  GRAY: '#9CA3AF'
} as const;

export const LOCALES = {
  EN: 'en',
  ES: 'es',
  ZH: 'zh'
} as const;

export const DEFAULT_LOCALE = LOCALES.EN;
