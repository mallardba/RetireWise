import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Formatters } from '@/utils/formatters';
import { PAY_PERIODS_PER_YEAR } from '@/constants';
import type { PaycheckImpact, PayFrequency, EmployerMatch } from '@/types';

interface PaycheckDetailsProps {
  impact: PaycheckImpact;
  payFrequency: PayFrequency;
  employerMatch: EmployerMatch;
  annualContribution: number;
}

export const PaycheckDetails: React.FC<PaycheckDetailsProps> = ({
  impact,
  payFrequency,
  employerMatch,
  annualContribution
}) => {
  const { t, i18n } = useTranslation();

  const payPeriodsPerYear = PAY_PERIODS_PER_YEAR[payFrequency];
  const employerContributionPerPaycheck = employerMatch.enabled
    ? (annualContribution * employerMatch.matchPercentage / 100) / payPeriodsPerYear
    : 0;

  return (
    <Card title={t('paycheckDetails.title')}>
      <div className="space-y-4">
        {/* Paycheck Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('paycheckDetails.grossPay')}</span>
            <span className="text-lg font-semibold text-gray-900">
              {Formatters.currencyPrecise(impact.grossPay, i18n.language)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('paycheckDetails.yourContribution')}</span>
            <span className="text-lg font-semibold text-primary">
              -{Formatters.currencyPrecise(impact.contribution, i18n.language)}
            </span>
          </div>

          {employerMatch.enabled && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('paycheckDetails.employerMatch')}</span>
              <span className="text-lg font-semibold text-success">
                +{Formatters.currencyPrecise(employerContributionPerPaycheck, i18n.language)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{t('paycheckDetails.netPay')}</span>
              <span className="text-xl font-bold text-gray-900">
                {Formatters.currencyPrecise(impact.takeHomePay, i18n.language)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
