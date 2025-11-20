import { useState, useEffect } from 'react';
import { ApiService } from '@/services/api.service';
import { LoadingState } from '@/enums';
import type {
  UserProfile,
  ContributionSettings,
  EmployerMatch,
  YTDContributions,
  PaycheckImpact
} from '@/types';

export const useContribution = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [contribution, setContribution] = useState<ContributionSettings | null>(null);
  const [employerMatch, setEmployerMatch] = useState<EmployerMatch | null>(null);
  const [ytdContributions, setYtdContributions] = useState<YTDContributions | null>(null);
  const [paycheckImpact, setPaycheckImpact] = useState<PaycheckImpact | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingState(LoadingState.LOADING);
      const data = await ApiService.getUserProfile();
      setProfile(data.profile);
      setContribution(data.contribution);
      setEmployerMatch(data.employerMatch);
      setYtdContributions(data.ytdContributions);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setLoadingState(LoadingState.ERROR);
    }
  };

  const updateContribution = async (newSettings: ContributionSettings) => {
    try {
      setLoadingState(LoadingState.LOADING);
      const result = await ApiService.updateContribution(newSettings);
      setContribution(newSettings);
      setPaycheckImpact(result.paycheckImpact);
      setLoadingState(LoadingState.SUCCESS);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contribution');
      setLoadingState(LoadingState.ERROR);
      throw err;
    }
  };

  return {
    profile,
    contribution,
    employerMatch,
    ytdContributions,
    paycheckImpact,
    loadingState,
    error,
    updateContribution,
    reload: loadData
  };
};
