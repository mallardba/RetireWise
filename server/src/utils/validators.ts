import { z } from 'zod';
import { ContributionType, AccountType } from '../enums/index.js';
import { IRS_LIMITS, PERCENTAGE_LIMITS } from '../constants/index.js';

export const ContributionSettingsSchema = z.object({
  type: z.nativeEnum(ContributionType),
  amount: z.number().positive(),
  accountType: z.nativeEnum(AccountType)
}).refine((data) => {
  if (data.type === ContributionType.PERCENTAGE) {
    return data.amount >= PERCENTAGE_LIMITS.MIN && 
           data.amount <= PERCENTAGE_LIMITS.MAX;
  }
  return data.amount <= IRS_LIMITS.MAX_CONTRIBUTION_2024;
}, {
  message: 'Invalid contribution amount for type'
});

export const ProjectionQuerySchema = z.object({
  contributionAmount: z.string().optional().transform(val => val ? parseFloat(val) : undefined),
  retirementAge: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined)
});
