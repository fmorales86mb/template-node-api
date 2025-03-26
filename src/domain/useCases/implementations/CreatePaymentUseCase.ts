import { inject, injectable } from "inversify";
import { ICreatePaymentUseCase } from "..";
import { Payment } from "../../entities";
import { CreatePaymentInput } from "../../inputs";
import { TYPES } from "../../../configuration/types";
import { IPaymentsRepository } from "../../../infrastructure/repositories";

@injectable()
export class CreatePaymentUseCase implements ICreatePaymentUseCase{
  constructor(
    @inject(TYPES.PaymentsRepository) private paymentsRepository: IPaymentsRepository,
  ) {}

    async execute(input: CreatePaymentInput): Promise<Payment> {
        try {
              const newPayment: Payment = {
                id: "",
                creationDate: new Date(),
                merchantId: input.merchantId,
                transactionId: "transaction.id",
                receivableId: "receivable.id",
              }
  
              return await this.paymentsRepository.create(newPayment);
        } catch (error) {
            throw error;
        }
    }
}