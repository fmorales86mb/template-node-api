import { Request, Response } from 'express';
import { PaymentController } from '../../../src/application/controllers';
import { ICreatePaymentUseCase } from '../../../src/domain/useCases';
import { PaymentResponseDto } from '../../../src/application/dtos';
import { Payment } from '../../../src/domain/entities';
import { CreatePaymentInput } from '../../../src/domain/inputs';
import { TransactionMethods } from '../../../src/domain/enums';

describe('PaymentController', () => {
  const createPaymentUseCaseMock: ICreatePaymentUseCase = {
    execute: jest.fn(),
  };
  const target = new PaymentController(createPaymentUseCaseMock);
  let req: Partial<Request>;
  let res: Partial<Response>;
  const next = jest.fn();

  const expectedPaymentDto: PaymentResponseDto = {
    id: 'payment123',
    creation_date: '2021-09-01T00:00:00.000Z',
    merchant_id: 'merchant123',
    transaction_id: 'transaction123',
    receivable_id: 'receivable123',
  }

  const payment: Payment = {
    id: 'payment123',
    creationDate: new Date('2021-09-01T00:00:00.000Z'),
    merchantId: 'merchant123',
    transactionId: 'transaction123',
    receivableId: 'receivable123',
  }

  const input: CreatePaymentInput = {
    value: 100,
    description: 'Test Payment',
    method: TransactionMethods.CREDIT_CARD,
    cardNumber: '1234',
    cardHolderName: 'John Doe',
    cardExpirationDate: '12/25',
    cardCvv: '123',
    merchantId: 'merchant123',
  }

  beforeEach(() => {
    req = {
      body: {
        value: 100,
        description: 'Test Payment',
        method: 'credit_card',
        card_number: '1234',
        card_holder_name: 'John Doe',
        card_expiration_date: '12/25',
        card_cvv: '123',
        merchant_id: 'merchant123',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('create', () => {
    it('should create a payment successfully', async () => {
      createPaymentUseCaseMock.execute = jest.fn().mockResolvedValueOnce(payment);

      await target.create(req as Request, res as Response, next);

      expect(createPaymentUseCaseMock.execute).toHaveBeenCalledWith(input);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedPaymentDto);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors when creating a payment', async () => {
      const err = new Error('Error creating payment')
      createPaymentUseCaseMock.execute = jest.fn().mockRejectedValueOnce(new Error('Error creating payment'));

      await target.create(req as Request, res as Response, next);

      expect(createPaymentUseCaseMock.execute).toHaveBeenCalledWith(input);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});