import { Router } from 'express';
import { ContributionService } from '../services/contribution.service.js';
import { UserService } from '../services/user.service.js';
import { CalculationUtils } from '../utils/calculations.js';
import { ContributionSettingsSchema } from '../utils/validators.js';
import { API_ROUTES } from '../constants/index.js';
import { HttpStatus, ApiErrorCode } from '../enums/index.js';
import type { ApiResponse, PaycheckImpact } from '../types/index.js';

const router = Router();

router.post(API_ROUTES.UPDATE, (req, res) => {
  try {
    const userId = 'user-1';
    
    const validationResult = ContributionSettingsSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      const response: ApiResponse<never> = {
        success: false,
        error: {
          code: ApiErrorCode.VALIDATION_ERROR,
          message: validationResult.error.message
        }
      };
      return res.status(HttpStatus.BAD_REQUEST).json(response);
    }

    const settings = validationResult.data;
    const result = ContributionService.updateContribution(userId, settings);
    
    const userData = UserService.getUserProfile(userId);
    const paycheckImpact = CalculationUtils.calculatePaycheckImpact(
      settings,
      userData.profile.salary,
      userData.profile.payFrequency
    );

    const response: ApiResponse<{
      annualContribution: number;
      paycheckImpact: PaycheckImpact;
    }> = {
      success: true,
      data: {
        annualContribution: result.annualContribution,
        paycheckImpact
      }
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: ApiErrorCode.INTERNAL_ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    };
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
  }
});

export default router;
