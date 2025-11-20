import { Router } from 'express';
import { UserService } from '../services/user.service.js';
import { API_ROUTES } from '../constants/index.js';
import { HttpStatus, ApiErrorCode } from '../enums/index.js';
import type { ApiResponse } from '../types/index.js';

const router = Router();

router.get(API_ROUTES.PROFILE, (req, res) => {
  try {
    const userId = 'user-1';
    const data = UserService.getUserProfile(userId);
    
    const response: ApiResponse<typeof data> = {
      success: true,
      data
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
