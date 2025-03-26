import { body, ValidationChain } from 'express-validator';

export class PaymentControllerValidator {
  static validateCreatePayment(): ValidationChain[] {
    return [
      body('value')
        .notEmpty().withMessage('Value is required')
        .isFloat({ min: 0 }).withMessage('Value must be a positive number'),
      
      body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),

      body('method') 
        .notEmpty().withMessage('Payment method is required')
        .isIn(['credit_card', 'debit_card']).withMessage('Invalid payment method'),
      
      body('card_number')
        .notEmpty().withMessage('Card number is required')
        .isLength({ min: 16, max: 16 }).withMessage('Card number must be the last 16 digits'),
      
      body('card_holder_name')
        .notEmpty().withMessage('Card holder name is required')
        .isString().withMessage('Card holder name must be a string'),
      
      body('card_expiration_date')
        .notEmpty().withMessage('Card expiration date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/).withMessage('Card expiration date must be in MM/YY format'),
      
      body('card_cvv')
        .notEmpty().withMessage('Card CVV is required')
        .isLength({ min: 3, max: 3 }).withMessage('Card CVV must be 3 digits')
        .isNumeric().withMessage('Card CVV must be numeric'),
      
      body('merchant_id')
        .notEmpty().withMessage('Merchant ID is required')
        .isString().withMessage('Merchant ID must be a string')
    ];
  }
}