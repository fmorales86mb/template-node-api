import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import { container } from '../configuration/inversify.config';
import { IPaymentController } from './controllers';
import { TYPES } from '../configuration/types';
import { PaymentControllerValidator } from './validators/PaymentControllerValidator';
import { validate } from '../commons/middlewares/validationMiddleware';

const paymentsController = container.get<IPaymentController>(TYPES.PaymentController);

const router = express.Router();

router.post('/', 
    PaymentControllerValidator.validateCreatePayment(),
    validate,
    (req: Request, res: Response, next: NextFunction) => paymentsController.create(req, res, next)
)

export { router as PaymentRouter };