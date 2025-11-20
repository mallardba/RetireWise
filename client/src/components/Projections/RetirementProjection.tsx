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
          <h2 className="text-xl font-semibold text-gray-900">
            {t('projection.title')}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {t('projection.subtitle', {
              rate: Formatters.percentage(projection.annualReturn * 100, 0)
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              {t('projection.age', { age: projection.retirementAge })}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {Formatters.currency(projection.projectedBalance, i18n.language)}
            </p>
          </div>
          <div className="text-center p-4 bg-success-light rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              {t('projection.contributions')}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-success">
              {Formatters.currency(projection.totalContributions, i18n.language)}
            </p>
          </div>
          <div className="text-center p-4 bg-warning-light rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              {t('projection.growth')}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-warning">
              {Formatters.currency(projection.totalGrowth, i18n.language)}
            </p>
          </div>
        </div>

        <ProjectionChart milestones={projection.milestones} />

        <p className="text-sm text-gray-600 text-center">
          {t('projection.yearsTo', { years: projection.yearsToRetirement })}
        </p>
      </div>
    </Card>
  );
};
