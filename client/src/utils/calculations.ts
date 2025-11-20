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
}
