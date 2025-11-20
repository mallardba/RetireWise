import React from 'react';
import { ContributionType } from '@/enums';
import { PERCENTAGE_LIMITS, IRS_LIMITS } from '@/constants';

interface AmountInputProps {
  type: ContributionType;
  value: number;
  onChange: (value: number) => void;
  age: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  type,
  value,
  onChange,
  age
}) => {
  const max = type === ContributionType.PERCENTAGE
    ? PERCENTAGE_LIMITS.MAX
    : (age >= 50 ? IRS_LIMITS.MAX_TOTAL_2024 : IRS_LIMITS.MAX_CONTRIBUTION_2024);

  const min = type === ContributionType.PERCENTAGE
    ? PERCENTAGE_LIMITS.MIN
    : 0;

  const step = type === ContributionType.PERCENTAGE ? 0.5 : 100;
  const prefix = type === ContributionType.DOLLAR ? '$' : '';
  const suffix = type === ContributionType.PERCENTAGE ? '%' : '';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
        <div className="w-32">
          <div className="relative">
            {prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {prefix}
              </span>
            )}
            <input
              type="number"
              value={value}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value) || 0;
                onChange(Math.min(Math.max(newValue, min), max));
              }}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base ${
                prefix ? 'pl-7' : ''
              } ${suffix ? 'pr-8' : ''}`}
              min={min}
              max={max}
              step={step}
            />
            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
