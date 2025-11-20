import React from 'react';
import { useContribution } from '@/hooks/useContribution';
import { useProjections } from '@/hooks/useProjections';
import { Header } from '@/components/Layout/Header';
import { ContributionForm } from '@/components/ContributionForm/ContributionForm';
import { YTDProgress } from './YTDProgress';
import { PaycheckImpact } from './PaycheckImpact';
import { PaycheckDetails } from './PaycheckDetails';
import { AccountInfo } from './AccountInfo';
import { RetirementProjection } from '@/components/Projections/RetirementProjection';
import { LoadingSpinner } from '@/components/Common/LoadingSpinner';
import { LoadingState } from '@/enums';
import { CalculationUtils } from '@/utils/calculations';

export const Dashboard: React.FC = () => {
  const {
    profile,
    contribution,
    employerMatch,
    ytdContributions,
    paycheckImpact,
    loadingState,
    error,
    updateContribution
  } = useContribution();

  // Calculate annual contribution for projections
  const annualContribution = contribution && profile
    ? CalculationUtils.calculateAnnualContribution(contribution, profile.salary)
    : 0;

  const { projection } = useProjections(annualContribution || undefined, profile?.retirementAge);

  if (loadingState === LoadingState.LOADING && !profile) {
    return <LoadingSpinner />;
  }

  if (error || !profile || !contribution || !ytdContributions || !employerMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load data'}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Compute paycheck impact if not available from API
  const currentPaycheckImpact = paycheckImpact || CalculationUtils.calculatePaycheckImpact(
    contribution,
    profile.salary,
    profile.payFrequency
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={profile.name} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <ContributionForm
              profile={profile}
              initialSettings={contribution}
              onUpdate={updateContribution}
              loadingState={loadingState}
              employerMatch={employerMatch}
            />
            <AccountInfo
              employerMatch={employerMatch}
              age={profile.age}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <YTDProgress
                ytdContributions={ytdContributions}
                age={profile.age}
              />
              <PaycheckDetails
                impact={currentPaycheckImpact}
                payFrequency={profile.payFrequency}
                employerMatch={employerMatch}
                annualContribution={annualContribution}
              />
            </div>

            <PaycheckImpact
              impact={currentPaycheckImpact}
              payFrequency={profile.payFrequency}
            />

            {projection && (
              <RetirementProjection projection={projection} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
