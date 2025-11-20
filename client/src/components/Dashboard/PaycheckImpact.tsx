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

  return (
    <Card title={t('paycheck.title')}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('paycheck.current')}</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {Formatters.currencyPrecise(impact.takeHomePay, i18n.language)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t('paycheck.difference')}</p>
            <p className={`text-xl sm:text-2xl font-bold ${impact.netImpact < 0 ? 'text-warning' : 'text-success'}`}>
              {impact.netImpact < 0 ? '-' : '+'}{Formatters.currencyPrecise(Math.abs(impact.netImpact), i18n.language)}
            </p>
          </div>
        </div>

        <div className="bg-success-light rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-1">{t('paycheck.taxSavings')}</p>
          <p className="text-xl font-bold text-success">
            {Formatters.currencyPrecise(impact.taxSavings, i18n.language)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {t('paycheck.perPeriod', { period: frequencyLabel })}
          </p>
        </div>
      </div>
    </Card>
  );
};
