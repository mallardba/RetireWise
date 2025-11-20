import { API_ENDPOINTS } from '@/constants';
import type {
  ApiResponse,
  UserProfile,
  ContributionSettings,
  EmployerMatch,
  YTDContributions,
  RetirementProjection,
  PaycheckImpact
} from '@/types';

export class ApiService {
  static async getUserProfile(): Promise<{
    profile: UserProfile;
    contribution: ContributionSettings;
    employerMatch: EmployerMatch;
    ytdContributions: YTDContributions;
  }> {

    const response = await fetch(API_ENDPOINTS.USER_PROFILE);
    const json: ApiResponse<any> = await response.json();
    
    if (!json.success || !json.data) {
      throw new Error(json.error?.message || 'Failed to load profile');
    }
    
    return json.data;
  }

  static async updateContribution(
    settings: ContributionSettings
  ): Promise<{
    annualContribution: number;
    paycheckImpact: PaycheckImpact;
  }> {
    const response = await fetch(API_ENDPOINTS.UPDATE_CONTRIBUTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    
    const json: ApiResponse<any> = await response.json();
    
    if (!json.success || !json.data) {
      throw new Error(json.error?.message || 'Failed to update contribution');
    }
    
    return json.data;
  }

  static async getRetirementProjection(
    contributionAmount?: number,
    retirementAge?: number
  ): Promise<RetirementProjection> {
    const params = new URLSearchParams();
    if (contributionAmount !== undefined) {
      params.append('contributionAmount', contributionAmount.toString());
    }
    if (retirementAge !== undefined) {
      params.append('retirementAge', retirementAge.toString());
    }
    
    const url = `${API_ENDPOINTS.RETIREMENT_PROJECTION}${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);
    const json: ApiResponse<RetirementProjection> = await response.json();
    
    if (!json.success || !json.data) {
      throw new Error(json.error?.message || 'Failed to load projection');
    }
    
    return json.data;
  }
}
