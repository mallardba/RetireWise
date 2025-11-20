import { Router } from 'express';
import { ProjectionService } from '../services/projection.service.js';
import { ProjectionQuerySchema } from '../utils/validators.js';
import { API_ROUTES } from '../constants/index.js';
import { HttpStatus, ApiErrorCode } from '../enums/index.js';
import type { ApiResponse, RetirementProjection } from '../types/index.js';

const router = Router();

router.get(API_ROUTES.RETIREMENT, (req, res) => {
  try {
    const userId = 'user-1';
    
    const validationResult = ProjectionQuerySchema.safeParse(req.query);
    
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

    const { contributionAmount, retirementAge } = validationResult.data;
    
    const projection = ProjectionService.getRetirementProjection(
      userId,
      contributionAmount,
      retirementAge
    );

    const response: ApiResponse<RetirementProjection> = {
      success: true,
      data: projection
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
