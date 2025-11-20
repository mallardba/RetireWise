import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/Common/Card';
import { Button } from '@/components/Common/Button';
import { ContributionTypeToggle } from './ContributionTypeToggle';
import { AmountInput } from './AmountInput';
import { ContributionType, AccountType, LoadingState } from '@/enums';
import { Formatters } from '@/utils/formatters';
import { CalculationUtils } from '@/utils/calculations';
import { IRS_LIMITS } from '@/constants';
import type { ContributionSettings, UserProfile, EmployerMatch } from '@/types';

interface ContributionFormProps {
  profile: UserProfile;
  initialSettings: ContributionSettings;
  onUpdate: (settings: ContributionSettings) => Promise<void>;
  loadingState: LoadingState;
  employerMatch: EmployerMatch;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({
  profile,
  initialSettings,
  onUpdate,
  loadingState,
  employerMatch
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

  const annualEmployerMatch = employerMatch.enabled
    ? (annualContribution * employerMatch.matchPercentage / 100)
    : 0;

  const employerMatchPerPaycheck = annualEmployerMatch / 26;

  // Check if contribution exceeds IRS limit
  const irsLimit = profile.age >= IRS_LIMITS.CATCH_UP_CONTRIBUTION_AGE
    ? IRS_LIMITS.MAX_TOTAL_2024
    : IRS_LIMITS.MAX_CONTRIBUTION_2024;

  const exceedsLimit = annualContribution > irsLimit;
  const overLimitAmount = exceedsLimit ? annualContribution - irsLimit : 0;

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
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('contribution.amount.label')}
            </label>
            {exceedsLimit && (
              <div className="flex items-center gap-1 text-amber-600">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">
                  {t('contribution.overBy', {
                    amount: Formatters.currency(overLimitAmount, i18n.language),
                    limit: Formatters.currency(irsLimit, i18n.language)
                  })}
                </span>
              </div>
            )}
          </div>
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
            {employerMatch.enabled && (
              <p className="text-xs text-success mt-1">
                +{Formatters.currency(annualEmployerMatch, i18n.language)} {t('contribution.employerMatch')}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">{t('contribution.perPaycheck')}</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {Formatters.currency(annualContribution / 26, i18n.language)}
            </p>
            {employerMatch.enabled && (
              <p className="text-xs text-success mt-1">
                +{Formatters.currency(employerMatchPerPaycheck, i18n.language)} {t('contribution.employerMatch')}
              </p>
            )}
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
          disabled={!hasChanges || loadingState === LoadingState.LOADING || exceedsLimit}
          className="w-full"
        >
          {loadingState === LoadingState.LOADING
            ? t('common.loading')
            : t('contribution.save')}
        </Button>
        {exceedsLimit && hasChanges && (
          <p className="text-xs text-amber-600 text-center mt-2">
            {t('contribution.cannotSaveOverLimit')}
          </p>
        )}
      </div>
    </Card>
  );
};
