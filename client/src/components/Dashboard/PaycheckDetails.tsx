import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Formatters } from '@/utils/formatters';
import { CalculationUtils } from '@/utils/calculations';
import { PAY_PERIODS_PER_YEAR, TAX_ASSUMPTIONS } from '@/constants';
import type { PaycheckImpact, PayFrequency, EmployerMatch } from '@/types';

interface PaycheckDetailsProps {
  impact: PaycheckImpact;
  payFrequency: PayFrequency;
  employerMatch: EmployerMatch;
  annualContribution: number;
  salary: number;
}

export const PaycheckDetails: React.FC<PaycheckDetailsProps> = ({
  impact,
  payFrequency,
  employerMatch,
  annualContribution,
  salary
}) => {
  const { t, i18n } = useTranslation();

  const payPeriodsPerYear = PAY_PERIODS_PER_YEAR[payFrequency];
  const annualEmployerMatch = employerMatch.enabled
    ? CalculationUtils.calculateEmployerMatch(
        annualContribution,
        salary,
        employerMatch.matchPercentage,
        employerMatch.capPercentage
      )
    : 0;
  const employerContributionPerPaycheck = annualEmployerMatch / payPeriodsPerYear;

  // Calculate actual taxes paid (after 401k tax benefit)
  // This is derived from: grossPay - contribution - taxes = takeHomePay
  // So: taxes = grossPay - contribution - takeHomePay
  const taxesDeducted = impact.grossPay - impact.contribution - impact.takeHomePay;

  return (
    <Card title={t('paycheckDetails.title')}>
      <div className="space-y-4">
        {/* Paycheck Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('paycheckDetails.grossPay')}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {Formatters.currencyPrecise(impact.grossPay, i18n.language)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('paycheckDetails.taxes')}</span>
            <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              -{Formatters.currencyPrecise(taxesDeducted, i18n.language)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('paycheckDetails.yourContribution')}</span>
            <span className="text-lg font-semibold text-primary dark:text-primary-light">
              -{Formatters.currencyPrecise(impact.contribution, i18n.language)}
            </span>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('paycheckDetails.netPay')}</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {Formatters.currencyPrecise(impact.takeHomePay, i18n.language)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
