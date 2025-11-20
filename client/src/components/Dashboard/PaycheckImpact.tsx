import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Formatters } from '@/utils/formatters';
import type { PaycheckImpact as PaycheckImpactType, PayFrequency } from '@/types';

interface PaycheckImpactProps {
  impact: PaycheckImpactType;
  payFrequency: PayFrequency;
}

export const PaycheckImpact: React.FC<PaycheckImpactProps> = ({
  impact,
  payFrequency
}) => {
  const { t, i18n } = useTranslation();

  const frequencyLabel = payFrequency.toLowerCase();
  const withoutContribution = impact.takeHomePay + impact.netImpact;

  return (
    <Card title={t('paycheck.title')}>
      <div className="space-y-4">
        {/* Comparison */}
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2">
            <span className="text-sm text-gray-600">{t('paycheck.without401k')}</span>
            <span className="text-lg font-semibold text-gray-400">
              {Formatters.currencyPrecise(withoutContribution, i18n.language)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm border-l-2 border-primary pl-3">
            <span className="text-gray-600">{t('paycheck.yourContribution')}</span>
            <span className="font-medium text-primary">
              -{Formatters.currencyPrecise(impact.contribution, i18n.language)}
            </span>
          </div>

          {impact.taxSavings >= 0 && (
            <div className="flex justify-between items-center text-sm border-l-2 border-success pl-3">
              <span className="text-gray-600">{t('paycheck.taxSavings')}</span>
              <span className="font-medium text-success">
                +{Formatters.currencyPrecise(impact.taxSavings, i18n.language)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900">{t('paycheck.actualTakeHome')}</span>
              <span className="text-2xl font-bold text-gray-900">
                {Formatters.currencyPrecise(impact.takeHomePay, i18n.language)}
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                {impact.taxSavings > 0
                  ? t('paycheck.savingsExplainer', {
                      contribution: Formatters.currencyPrecise(impact.contribution, i18n.language),
                      realCost: Formatters.currencyPrecise(impact.netImpact, i18n.language)
                    })
                  : t('paycheck.rothExplainer', {
                      contribution: Formatters.currencyPrecise(impact.contribution, i18n.language)
                    })
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
