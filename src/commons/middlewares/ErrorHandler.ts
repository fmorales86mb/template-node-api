import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { CustomValidationError } from '../errors/ValidationError';
import { error } from 'console';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error('Error:', err.message);

  if (err instanceof CustomValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.validationErrors,
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Ocurrió un error inseperado.'  
});
}