import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Formatters } from '@/utils/formatters';
import { IRS_LIMITS } from '@/constants';
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

  return (
    <Card title={t('accountInfo.title')}>
      <div className="space-y-4">
        {/* IRS Limit Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t('accountInfo.irsLimit')}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {Formatters.currency(maxLimit, i18n.language)}
            </span>
            {age >= IRS_LIMITS.CATCH_UP_CONTRIBUTION_AGE && (
              <span className="text-xs text-gray-600">
                {t('accountInfo.includesCatchUp')}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('accountInfo.irsLimitDesc')}
          </p>
        </div>

        {/* Employer Match Info */}
        {employerMatch.enabled ? (
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {t('accountInfo.employerMatchRate')}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-600">
                {employerMatch.matchPercentage}%
              </span>
              <span className="text-sm text-gray-600">
                {t('accountInfo.upTo')} {employerMatch.capPercentage}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t('accountInfo.employerMatchDesc')}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              {t('accountInfo.employerMatchRate')}
            </p>
            <p className="text-sm text-gray-600">
              {t('accountInfo.noEmployerMatch')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
