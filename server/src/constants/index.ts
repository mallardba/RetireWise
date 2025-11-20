export * from '../../../shared/constants/index.js';

export const SERVER_CONFIG = {
  PORT: 3001,
  HOST: '127.0.0.1',
  CORS_ORIGIN: 'http://localhost:5173'
} as const;

export const DATABASE_CONFIG = {
  FILENAME: 'contributions.db',
  TIMEOUT: 5000
} as const;

export const API_ROUTES = {
  BASE: '/api',
  USER: '/user',
  PROFILE: '/profile',
  CONTRIBUTION: '/contribution',
  UPDATE: '/update',
  PROJECTION: '/projection',
  RETIREMENT: '/retirement'
} as const;

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  INVALID_CONTRIBUTION_AMOUNT: 'Invalid contribution amount',
  EXCEEDS_IRS_LIMIT: 'Contribution exceeds IRS annual limit',
  INVALID_PERCENTAGE: 'Percentage must be between 0 and 100',
  DATABASE_ERROR: 'Database operation failed',
  VALIDATION_ERROR: 'Request validation failed'
} as const;
