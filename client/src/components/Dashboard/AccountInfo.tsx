import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Tooltip } from '@/components/Common/Tooltip';
import { Formatters } from '@/utils/formatters';
import { IRS_LIMITS, TAX_ASSUMPTIONS } from '@/constants';
import type { EmployerMatch } from '@/types';

interface AccountInfoProps {
  employerMatch: EmployerMatch;
  age: number;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({
  employerMatch,
  age
}) => {
  const { t, i18n } = useTranslation();

  const maxLimit = age >= IRS_LIMITS.CATCH_UP_CONTRIBUTION_AGE
    ? IRS_LIMITS.MAX_TOTAL_2024
    : IRS_LIMITS.MAX_CONTRIBUTION_2024;

  const totalTaxRate = (TAX_ASSUMPTIONS.FEDERAL_TAX_RATE + TAX_ASSUMPTIONS.STATE_TAX_RATE + TAX_ASSUMPTIONS.FICA_TAX_RATE) * 100;

  return (
    <Card title={t('accountInfo.title')}>
      <div className="space-y-4">
        {/* Tax Rate Info */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-900/40">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('accountInfo.taxRates')}
          </p>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>{t('accountInfo.federalTax')}</span>
              <span className="font-medium">{Formatters.percentage(TAX_ASSUMPTIONS.FEDERAL_TAX_RATE * 100, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('accountInfo.stateTax')}</span>
              <span className="font-medium">{Formatters.percentage(TAX_ASSUMPTIONS.STATE_TAX_RATE * 100, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                {t('accountInfo.ficaTax')}
                <Tooltip content={t('tooltips.fica')} />
              </span>
              <span className="font-medium">{Formatters.percentage(TAX_ASSUMPTIONS.FICA_TAX_RATE * 100, 1)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-amber-200 dark:border-amber-800">
              <span className="font-medium">{t('accountInfo.totalTax')}</span>
              <span className="font-bold">{Formatters.percentage(totalTaxRate, 1)}</span>
            </div>
          </div>
        </div>

        {/* IRS Limit Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            {t('accountInfo.irsLimit')}
            <Tooltip content={t('tooltips.irsLimit')} />
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {Formatters.currency(maxLimit, i18n.language)}
            </span>
            {age >= IRS_LIMITS.CATCH_UP_CONTRIBUTION_AGE && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {t('accountInfo.includesCatchUp')}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('accountInfo.irsLimitDesc')}
          </p>
        </div>

        {/* Employer Match Info */}
        {employerMatch.enabled ? (
          <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4 border border-blue-100 dark:border-blue-900/40">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              {t('accountInfo.employerMatchRate')}
              <Tooltip content={t('tooltips.employerMatch')} />
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {employerMatch.matchPercentage}%
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('accountInfo.match')}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('accountInfo.upTo')} {employerMatch.capPercentage}% {t('accountInfo.ofSalary')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {t('accountInfo.matchExplainer', {
                cap: employerMatch.capPercentage,
                effective: (employerMatch.matchPercentage * employerMatch.capPercentage / 100).toFixed(1)
              })}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('accountInfo.employerMatchRate')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('accountInfo.noEmployerMatch')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
