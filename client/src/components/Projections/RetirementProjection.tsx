import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { ProjectionChart } from './ProjectionChart';
import { Formatters } from '@/utils/formatters';
import type { RetirementProjection as RetirementProjectionType } from '@/types';

interface RetirementProjectionProps {
  projection: RetirementProjectionType;
}

export const RetirementProjection: React.FC<RetirementProjectionProps> = ({
  projection
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('projection.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t('projection.subtitle', {
              rate: Formatters.percentage(projection.annualReturn * 100, 0)
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 dark:border-primary/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {t('projection.age', { age: projection.retirementAge })}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-primary dark:text-primary-light">
              {Formatters.currency(projection.projectedBalance, i18n.language)}
            </p>
          </div>
          <div className="text-center p-4 bg-success-light dark:bg-green-900/20 rounded-lg border border-success/10 dark:border-green-900/40">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {t('projection.contributions')}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-success dark:text-green-400">
              {Formatters.currency(projection.totalContributions, i18n.language)}
            </p>
          </div>
          <div className="text-center p-4 bg-warning-light dark:bg-yellow-900/20 rounded-lg border border-warning/10 dark:border-yellow-900/40">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {t('projection.growth')}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-warning dark:text-yellow-400">
              {Formatters.currency(projection.totalGrowth, i18n.language)}
            </p>
          </div>
        </div>

        <ProjectionChart milestones={projection.milestones} />

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          {t('projection.yearsTo', { years: projection.yearsToRetirement })}
        </p>
      </div>
    </Card>
  );
};
