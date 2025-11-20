import { ContributionType, AccountType, PayFrequency } from '@/enums';
import { TAX_ASSUMPTIONS, PAY_PERIODS_PER_YEAR } from '@/constants';
import type { ContributionSettings, PaycheckImpact } from '@/types';

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

  static calculatePaycheckImpact(
    contributionSettings: ContributionSettings,
    salary: number,
    payFrequency: PayFrequency
  ): PaycheckImpact {
    const periodsPerYear = PAY_PERIODS_PER_YEAR[payFrequency];
    const grossPay = salary / periodsPerYear;

    const annualContribution = this.calculateAnnualContribution(
      contributionSettings,
      salary
    );
    const contribution = annualContribution / periodsPerYear;

    const taxSavings = contributionSettings.accountType === AccountType.TRADITIONAL
      ? contribution * (TAX_ASSUMPTIONS.FEDERAL_TAX_RATE + TAX_ASSUMPTIONS.STATE_TAX_RATE)
      : 0;

    const netImpact = contribution - taxSavings;
    const takeHomePay = grossPay - contribution - (
      (grossPay - contribution) * (
        TAX_ASSUMPTIONS.FEDERAL_TAX_RATE +
        TAX_ASSUMPTIONS.STATE_TAX_RATE +
        TAX_ASSUMPTIONS.FICA_TAX_RATE
      )
    ) + taxSavings;

    return {
      grossPay,
      contribution,
      taxSavings,
      netImpact,
      takeHomePay
    };
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

  /**
   * Calculate employer match based on employee contribution
   * Example: 50% match up to 6% of salary
   * - If employee contributes 5% of salary, employer adds 2.5% (50% of 5%)
   * - If employee contributes 8% of salary, employer adds 3% (50% of 6% cap)
   */
  static calculateEmployerMatch(
    employeeContribution: number,
    salary: number,
    matchPercentage: number,
    capPercentage: number
  ): number {
    const contributionPercent = (employeeContribution / salary) * 100;
    const effectiveContributionPercent = Math.min(contributionPercent, capPercentage);
    const matchAmount = (salary * effectiveContributionPercent / 100) * (matchPercentage / 100);
    return matchAmount;
  }
}
