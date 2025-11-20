import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContributionType } from '@/enums';

interface ContributionTypeToggleProps {
  value: ContributionType;
  onChange: (type: ContributionType) => void;
}

export const ContributionTypeToggle: React.FC<ContributionTypeToggleProps> = ({
  value,
  onChange
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex rounded-lg bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange(ContributionType.PERCENTAGE)}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors touch-manipulation ${
          value === ContributionType.PERCENTAGE
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('contribution.type.percentage')}
      </button>
      <button
        type="button"
        onClick={() => onChange(ContributionType.DOLLAR)}
        className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors touch-manipulation ${
          value === ContributionType.DOLLAR
            ? 'bg-white text-primary shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {t('contribution.type.dollar')}
      </button>
    </div>
  );
};
