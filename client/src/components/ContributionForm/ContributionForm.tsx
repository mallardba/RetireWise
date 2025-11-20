import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Button } from '@/components/Common/Button';
import { ContributionTypeToggle } from './ContributionTypeToggle';
import { AmountInput } from './AmountInput';
import { ContributionType, AccountType, LoadingState } from '@/enums';
import { Formatters } from '@/utils/formatters';
import { CalculationUtils } from '@/utils/calculations';
import type { ContributionSettings, UserProfile } from '@/types';

interface ContributionFormProps {
  profile: UserProfile;
  initialSettings: ContributionSettings;
  onUpdate: (settings: ContributionSettings) => Promise<void>;
  loadingState: LoadingState;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({
  profile,
  initialSettings,
  onUpdate,
  loadingState
}) => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  const annualContribution = CalculationUtils.calculateAnnualContribution(
    settings,
    profile.salary
  );

  const handleTypeChange = (type: ContributionType) => {
    let newAmount = settings.amount;
    
    if (type === ContributionType.PERCENTAGE && settings.type === ContributionType.DOLLAR) {
      newAmount = CalculationUtils.calculatePercentageFromDollar(settings.amount, profile.salary);
    } else if (type === ContributionType.DOLLAR && settings.type === ContributionType.PERCENTAGE) {
      newAmount = CalculationUtils.calculateDollarFromPercentage(settings.amount, profile.salary);
    }

    setSettings({ ...settings, type, amount: newAmount });
    setHasChanges(true);
  };

  const handleAmountChange = (amount: number) => {
    setSettings({ ...settings, amount });
    setHasChanges(true);
  };

  const handleAccountTypeChange = (accountType: AccountType) => {
    setSettings({ ...settings, accountType });
    setHasChanges(true);
  };

  const handleSubmit = async () => {
    await onUpdate(settings);
    setHasChanges(false);
  };

  return (
    <Card title={t('contribution.title')}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contribution.type.label')}
          </label>
          <ContributionTypeToggle
            value={settings.type}
            onChange={handleTypeChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contribution.amount.label')}
          </label>
          <AmountInput
            type={settings.type}
            value={settings.amount}
            onChange={handleAmountChange}
            age={profile.age}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">{t('contribution.annual')}</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {Formatters.currency(annualContribution, i18n.language)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('contribution.perPaycheck')}</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {Formatters.currency(annualContribution / 26, i18n.language)}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('contribution.accountType.label')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleAccountTypeChange(AccountType.TRADITIONAL)}
              className={`p-4 rounded-lg border-2 transition-all touch-manipulation ${
                settings.accountType === AccountType.TRADITIONAL
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900">
                {t('contribution.accountType.traditional')}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {t('contribution.accountType.traditionalDesc')}
              </p>
            </button>
            <button
              type="button"
              onClick={() => handleAccountTypeChange(AccountType.ROTH)}
              className={`p-4 rounded-lg border-2 transition-all touch-manipulation ${
                settings.accountType === AccountType.ROTH
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className="font-semibold text-gray-900">
                {t('contribution.accountType.roth')}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {t('contribution.accountType.rothDesc')}
              </p>
            </button>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!hasChanges || loadingState === LoadingState.LOADING}
          className="w-full"
        >
          {loadingState === LoadingState.LOADING
            ? t('common.loading')
            : t('contribution.save')}
        </Button>
      </div>
    </Card>
  );
};
