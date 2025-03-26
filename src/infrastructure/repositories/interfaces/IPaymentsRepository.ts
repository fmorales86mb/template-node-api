import { Payment } from "../../../domain/entities";

export interface IPaymentsRepository{
    create(payment:Payment):Promise<Payment>
    getByMerchantId(merchantId:string):Promise<Payment[]>
}