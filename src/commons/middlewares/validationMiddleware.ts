import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CustomValidationError } from '../errors/ValidationError';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error:CustomValidationError = new CustomValidationError('Validation error', errors.array());
    next(error)
  }
  next();
};