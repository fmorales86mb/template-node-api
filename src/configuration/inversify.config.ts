import { Container } from 'inversify';
import { TYPES } from './types';
import { IPaymentController, PaymentController } from '../application/controllers/';
import { CreatePaymentUseCase, ICreatePaymentUseCase } from '../domain/useCases';
import { IPaymentsRepository, PaymentsRepository } from '../infrastructure/repositories';

const container = new Container();

// controllers
container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController);

// use cases
container.bind<ICreatePaymentUseCase>(TYPES.CreatePaymentUseCase).to(CreatePaymentUseCase);

// repositories
container.bind<IPaymentsRepository>(TYPES.PaymentsRepository).to(PaymentsRepository);

export { container };