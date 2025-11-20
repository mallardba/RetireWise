import db from '../models/database.js';
import { CalculationUtils } from '../utils/calculations.js';
import { ERROR_MESSAGES, IRS_LIMITS } from '../constants/index.js';
import type { ContributionSettings } from '../types/index.js';

export class ContributionService {
  static updateContribution(userId: string, settings: ContributionSettings) {
    const userQuery = db.prepare(`SELECT salary, age FROM users WHERE id = ?`);
    const user = userQuery.get(userId) as { salary: number; age: number } | undefined;

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const annualContribution = CalculationUtils.calculateAnnualContribution(
      settings,
      user.salary
    );

    const maxLimit = user.age >= 50
      ? IRS_LIMITS.MAX_TOTAL_2024
      : IRS_LIMITS.MAX_CONTRIBUTION_2024;

    if (annualContribution > maxLimit) {
      throw new Error(ERROR_MESSAGES.EXCEEDS_IRS_LIMIT);
    }

    const updateQuery = db.prepare(`
      UPDATE users
      SET contribution_type = ?,
          contribution_amount = ?,
          account_type = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateQuery.run(
      settings.type,
      settings.amount,
      settings.accountType,
      userId
    );

    const historyQuery = db.prepare(`
      INSERT INTO contribution_history (user_id, contribution_type, contribution_amount, account_type)
      VALUES (?, ?, ?, ?)
    `);

    historyQuery.run(
      userId,
      settings.type,
      settings.amount,
      settings.accountType
    );

    return {
      success: true,
      annualContribution
    };
  }
}
