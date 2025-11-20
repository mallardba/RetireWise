import db from '../models/database.js';
import { ContributionType, AccountType, PayFrequency } from '../enums/index.js';
import { ERROR_MESSAGES } from '../constants/index.js';
import type {
  UserProfile,
  ContributionSettings,
  EmployerMatch,
  YTDContributions,
  DatabaseUser
} from '../types/index.js';

export class UserService {
  static getUserProfile(userId: string) {
    const query = db.prepare(`SELECT * FROM users WHERE id = ?`);
    const row = query.get(userId) as DatabaseUser | undefined;

    if (!row) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const profile: UserProfile = {
      id: row.id,
      name: row.name,
      email: row.email,
      salary: row.salary,
      age: row.age,
      dateOfBirth: row.date_of_birth,
      payFrequency: row.pay_frequency as PayFrequency,
      retirementAge: row.retirement_age
    };

    const contribution: ContributionSettings = {
      type: row.contribution_type as ContributionType,
      amount: row.contribution_amount,
      accountType: row.account_type as AccountType
    };

    const employerMatch: EmployerMatch = {
      enabled: row.employer_match_enabled === 1,
      matchPercentage: row.employer_match_percentage,
      capPercentage: row.employer_match_cap_percentage
    };

    const ytdContributions: YTDContributions = {
      employee: row.ytd_employee_contribution,
      employer: row.ytd_employer_contribution,
      total: row.ytd_employee_contribution + row.ytd_employer_contribution
    };

    return {
      profile,
      contribution,
      employerMatch,
      ytdContributions
    };
  }
}
