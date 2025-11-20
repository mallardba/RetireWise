import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Formatters } from '@/utils/formatters';
import { IRS_LIMITS } from '@/constants';
import type { YTDContributions } from '@/types';

interface YTDProgressProps {
  ytdContributions: YTDContributions;
  age: number;
}

export const YTDProgress: React.FC<YTDProgressProps> = ({
  ytdContributions,
  age
}) => {
  const { t, i18n } = useTranslation();
  
  const maxLimit = age >= 50
    ? IRS_LIMITS.MAX_TOTAL_2024
    : IRS_LIMITS.MAX_CONTRIBUTION_2024;
  
  const percentComplete = (ytdContributions.total / maxLimit) * 100;
  const remaining = maxLimit - ytdContributions.total;

  return (
    <Card title={t('ytd.title')}>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{t('ytd.employee')}</span>
            <span className="font-semibold">
              {Formatters.currency(ytdContributions.employee, i18n.language)}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{t('ytd.employer')}</span>
            <span className="font-semibold">
              {Formatters.currency(ytdContributions.employer, i18n.language)}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
            <span>{t('ytd.total')}</span>
            <span className="text-primary">
              {Formatters.currency(ytdContributions.total, i18n.language)}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              {t('ytd.progress', { percent: percentComplete.toFixed(1) })}
            </span>
            <span className="text-gray-600">
              {Formatters.currency(maxLimit, i18n.language)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-success h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(percentComplete, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {t('contribution.remaining')}: {Formatters.currency(remaining, i18n.language)}
          </p>
        </div>
      </div>
    </Card>
  );
};
