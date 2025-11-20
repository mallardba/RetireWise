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

    const employeeContribution = overrideAmount !== undefined
      ? overrideAmount
      : CalculationUtils.calculateAnnualContribution(
          userData.contribution,
          userData.profile.salary
        );

    // Calculate employer match
    const employerMatch = userData.employerMatch.enabled
      ? CalculationUtils.calculateEmployerMatch(
          employeeContribution,
          userData.profile.salary,
          userData.employerMatch.matchPercentage,
          userData.employerMatch.capPercentage
        )
      : 0;

    // Total annual contribution includes both employee and employer
    const totalAnnualContribution = employeeContribution + employerMatch;

    const retirementAge = overrideRetirementAge ?? userData.profile.retirementAge;

    return CalculationUtils.calculateRetirementProjection(
      userData.profile.age,
      retirementAge,
      totalAnnualContribution,
      userData.ytdContributions.total
    );
  }
}
