export * from '../../../shared/types/index.js';

export interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  salary: number;
  age: number;
  date_of_birth: string;
  pay_frequency: string;
  retirement_age: number;
  contribution_type: string;
  contribution_amount: number;
  account_type: string;
  ytd_employee_contribution: number;
  ytd_employer_contribution: number;
  employer_match_enabled: number;
  employer_match_percentage: number;
  employer_match_cap_percentage: number;
}
