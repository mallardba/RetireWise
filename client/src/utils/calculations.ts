import { ContributionType } from '@/enums';
import type { ContributionSettings } from '@/types';

export class CalculationUtils {
  static calculateAnnualContribution(
    settings: ContributionSettings,
    salary: number
  ): number {
    if (settings.type === ContributionType.PERCENTAGE) {
      return (salary * settings.amount) / 100;
    }
    return settings.amount;
  }

  static calculatePercentageFromDollar(
    dollarAmount: number,
    salary: number
  ): number {
    return (dollarAmount / salary) * 100;
  }

  static calculateDollarFromPercentage(
    percentage: number,
    salary: number
  ): number {
    return (salary * percentage) / 100;
  }
}
