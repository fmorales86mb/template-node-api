import { Payment } from "../../entities";
import { CreatePaymentInput } from "../../inputs";

export interface ICreatePaymentUseCase{
    execute(input:CreatePaymentInput):Promise<Payment>;
}