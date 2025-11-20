import { Request, Response, NextFunction } from 'express';
import { HttpStatus, ApiErrorCode } from '../enums/index.js';
import type { ApiResponse } from '../types/index.js';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: ApiErrorCode.INTERNAL_ERROR,
      message: err.message || 'An unexpected error occurred'
    }
  };

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
};
