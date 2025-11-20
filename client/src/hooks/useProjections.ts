import { useState, useEffect } from 'react';
import { ApiService } from '@/services/api.service';
import { LoadingState } from '@/enums';
import type { RetirementProjection } from '@/types';

export const useProjections = (
  contributionAmount?: number,
  retirementAge?: number
) => {
  const [projection, setProjection] = useState<RetirementProjection | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjection();
  }, [contributionAmount, retirementAge]);

  const loadProjection = async () => {
    try {
      setLoadingState(LoadingState.LOADING);
      const data = await ApiService.getRetirementProjection(
        contributionAmount,
        retirementAge
      );
      setProjection(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projection');
      setLoadingState(LoadingState.ERROR);
    }
  };

  return {
    projection,
    loadingState,
    error,
    reload: loadProjection
  };
};
