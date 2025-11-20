import { PayFrequency } from '../enums';

export const IRS_LIMITS = {
  MAX_CONTRIBUTION_2024: 23000,
  CATCH_UP_CONTRIBUTION_AGE: 50,
  CATCH_UP_AMOUNT_2024: 7500,
  MAX_TOTAL_2024: 30500
} as const;

export const CALCULATION_DEFAULTS = {
  ANNUAL_RETURN_RATE: 0.07,
  INFLATION_RATE: 0.025,
  SALARY_GROWTH_RATE: 0.03,
  DEFAULT_RETIREMENT_AGE: 65,
  EMPLOYER_MATCH_CAP_PERCENTAGE: 6
} as const;

export const TAX_ASSUMPTIONS = {
  FEDERAL_TAX_RATE: 0.22,
  STATE_TAX_RATE: 0.05,
  FICA_TAX_RATE: 0.0765
} as const;

export const PERCENTAGE_LIMITS = {
  MIN: 0,
  MAX: 100
} as const;

export const PAY_PERIODS_PER_YEAR = {
  [PayFrequency.WEEKLY]: 52,
  [PayFrequency.BIWEEKLY]: 26,
  [PayFrequency.SEMIMONTHLY]: 24,
  [PayFrequency.MONTHLY]: 12
} as const;
