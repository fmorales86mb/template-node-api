import { TransactionMethods } from "../enums";

export interface CreatePaymentInput{
    value: number,
    description: string,
    method: TransactionMethods,
    cardNumber: string,
    cardHolderName: string,
    cardExpirationDate: string,
    cardCvv: string,
    merchantId:string,
}