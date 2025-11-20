import { UserService } from './user.service.js';
import { CalculationUtils } from '../utils/calculations.js';
import type { RetirementProjection } from '../types/index.js';

export class ProjectionService {
  static getRetirementProjection(
    userId: string,
    overrideAmount?: number,
    overrideRetirementAge?: number
  ): RetirementProjection {
    const userData = UserService.getUserProfile(userId);
    
    const annualContribution = overrideAmount !== undefined
      ? overrideAmount
      : CalculationUtils.calculateAnnualContribution(
          userData.contribution,
          userData.profile.salary
        );

    const retirementAge = overrideRetirementAge ?? userData.profile.retirementAge;

    return CalculationUtils.calculateRetirementProjection(
      userData.profile.age,
      retirementAge,
      annualContribution,
      userData.ytdContributions.total
    );
  }
}
