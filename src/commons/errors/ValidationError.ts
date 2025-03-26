import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

export class CustomValidationError extends CustomError {
    validationErrors: ValidationError[]
  
    constructor(message: string, validationErrors: ValidationError[]) {
      super(message, 400);
      this.validationErrors = validationErrors;
      Object.setPrototypeOf(this, CustomValidationError.prototype);
    }
  }