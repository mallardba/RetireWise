import {
  CALCULATION_DEFAULTS,
  TAX_ASSUMPTIONS,
  PAY_PERIODS_PER_YEAR
} from '../constants/index.js';
import { ContributionType, PayFrequency, AccountType } from '../enums/index.js';
import type {
  ContributionSettings,
  PaycheckImpact,
  RetirementProjection,
  ProjectionMilestone
} from '../types/index.js';

export class CalculationUtils {
  static calculateAnnualContribution(
    contributionSettings: ContributionSettings,
    salary: number
  ): number {
    if (contributionSettings.type === ContributionType.PERCENTAGE) {
      return (salary * contributionSettings.amount) / 100;
    }
    return contributionSettings.amount;
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

  static calculateRetirementProjection(
    currentAge: number,
    retirementAge: number,
    annualContribution: number,
    currentBalance: number = 0
  ): RetirementProjection {
    const yearsToRetirement = retirementAge - currentAge;
    const r = CALCULATION_DEFAULTS.ANNUAL_RETURN_RATE;
    
    const futureValueOfCurrent = currentBalance * Math.pow(1 + r, yearsToRetirement);
    const futureValueOfContributions = annualContribution *
      (Math.pow(1 + r, yearsToRetirement) - 1) / r;
    
    const projectedBalance = futureValueOfCurrent + futureValueOfContributions;
    const totalContributions = annualContribution * yearsToRetirement;
    const totalGrowth = projectedBalance - currentBalance - totalContributions;

    const milestones: ProjectionMilestone[] = [];
    let balance = currentBalance;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      balance = (balance + annualContribution) * (1 + r);
      
      if (year % 5 === 0 || year === yearsToRetirement) {
        milestones.push({
          age: currentAge + year,
          year: new Date().getFullYear() + year,
          balance: Math.round(balance),
          contributions: Math.round(annualContribution * year)
        });
      }
    }

    return {
      currentAge,
      retirementAge,
      yearsToRetirement,
      currentBalance,
      projectedBalance: Math.round(projectedBalance),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      annualReturn: r,
      milestones
    };
  }
}
