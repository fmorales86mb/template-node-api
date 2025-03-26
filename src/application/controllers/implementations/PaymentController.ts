import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../configuration/types';
import { ICreatePaymentUseCase } from '../../../domain/useCases';
import { IPaymentController } from '../';
import { CreatePaymentInput } from '../../../domain/inputs';
import { Payment } from '../../../domain/entities';
import { PaymentResponseDto } from '../../dtos';

@injectable()
export class PaymentController implements IPaymentController{
  constructor(
    @inject(TYPES.CreatePaymentUseCase) private createPaymentUseCase: ICreatePaymentUseCase,    
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const input:CreatePaymentInput = {
        value: req.body.value,
        description: req.body.description,
        method: req.body.method,
        cardNumber: req.body.card_number,
        cardHolderName: req.body.card_holder_name,
        cardExpirationDate: req.body.card_expiration_date,
        cardCvv: req.body.card_cvv,
        merchantId: req.body.merchant_id,
      }
      
      const payment = await this.createPaymentUseCase.execute(input);
      const paymentDto = this.mapPaymentToDto(payment);
      res.status(201).json(paymentDto);
    } catch (error) {
      next(error)
    }
  }

  private mapPaymentToDto(payment: Payment): PaymentResponseDto {
    return {
        id: payment.id, 
        creation_date: payment.creationDate.toISOString(),
        merchant_id: payment.merchantId,
        transaction_id: payment.transactionId,
        receivable_id: payment.receivableId,
    };
  }
}