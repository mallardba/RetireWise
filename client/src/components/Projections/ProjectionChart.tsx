import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { Formatters } from '@/utils/formatters';
import { CHART_COLORS } from '@/constants';
import type { ProjectionMilestone } from '@/types';

interface ProjectionChartProps {
  milestones: ProjectionMilestone[];
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({ milestones }) => {
  const { t, i18n } = useTranslation();

  const data = milestones.map(m => ({
    age: m.age,
    balance: m.balance,
    contributions: m.contributions
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis
          dataKey="age"
          stroke="#6B7280"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="#6B7280"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => Formatters.compactCurrency(value, i18n.language)}
        />
        <Tooltip
          formatter={(value: number) => Formatters.currency(value, i18n.language)}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="balance"
          stroke={CHART_COLORS.PRIMARY}
          strokeWidth={3}
          dot={{ fill: CHART_COLORS.PRIMARY, r: 4 }}
          name={t('projection.balance')}
        />
        <Line
          type="monotone"
          dataKey="contributions"
          stroke={CHART_COLORS.SUCCESS}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: CHART_COLORS.SUCCESS, r: 3 }}
          name={t('projection.contributions')}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
