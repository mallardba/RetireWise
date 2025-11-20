import { ContributionType, AccountType, PayFrequency } from '../enums';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  salary: number;
  age: number;
  dateOfBirth: string;
  payFrequency: PayFrequency;
  retirementAge: number;
}

export interface ContributionSettings {
  type: ContributionType;
  amount: number;
  accountType: AccountType;
}

export interface EmployerMatch {
  enabled: boolean;
  matchPercentage: number;
  capPercentage: number;
}

export interface YTDContributions {
  employee: number;
  employer: number;
  total: number;
}

export interface PaycheckImpact {
  grossPay: number;
  contribution: number;
  taxSavings: number;
  netImpact: number;
  takeHomePay: number;
}

export interface RetirementProjection {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  currentBalance: number;
  projectedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  annualReturn: number;
  milestones: ProjectionMilestone[];
}

export interface ProjectionMilestone {
  age: number;
  year: number;
  balance: number;
  contributions: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
