import { injectable } from 'inversify';
import { Payment } from '../../../domain/entities';
import { IPaymentsRepository } from '../interfaces/IPaymentsRepository';
import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import { v4 } from 'uuid';
import { PaymentDto } from '../../dtos';
import { CustomError } from '../../../commons/errors/CustomError';

@injectable()
export class PaymentsRepository implements IPaymentsRepository {
    private readonly baseUrl = 'http://0.0.0.0:8080/payments';
    private readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create();
    }

    async create(payment: Payment): Promise<Payment> {
        payment.id = v4();

        const paymentDto = this.mapPaymentToDto(payment);

        try {            
            const response = await this.axiosInstance.post<PaymentDto>(this.baseUrl, paymentDto);
            return this.mapDtoToPayment(response.data);
        } catch (error) {
            throw this.handleError('Failed to create Payment', error);
        }
    }

    async getById(id: string): Promise<Payment> {
        try {
            const response = await this.axiosInstance.get<PaymentDto>(`${this.baseUrl}/${id}`);
            return this.mapDtoToPayment(response.data);
        } catch (error) {
            throw this.handleError(`Failed to get payment with ID ${id}`, error);            
        }
    }

    async getAll(): Promise<Payment[]> {
        try {
            const response = await this.axiosInstance.get<PaymentDto[]>(this.baseUrl);
            return response.data.map(this.mapDtoToPayment);
        } catch (error) {
            throw this.handleError('Failed to get payments', error);                 
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.axiosInstance.delete(`${this.baseUrl}/${id}`);
        } catch (error) {
            throw this.handleError(`Failed to delete payment with ID ${id}`, error);             
        }
    }

    async getByMerchantId(merchantId: string): Promise<Payment[]> {
        try {
            const response = await this.axiosInstance.get<PaymentDto[]>(this.baseUrl, { params: {merchant_id: merchantId} });
            return response.data.map(this.mapDtoToPayment);
        } catch (error) {
            throw this.handleError('Failed to search payments', error);
        }
    }

    private mapDtoToPayment(dto: PaymentDto): Payment {
        return {
            id: dto.id,
            creationDate: new Date(dto.creation_date),
            merchantId: dto.merchant_id,
            transactionId: dto.transaction_id,
            receivableId:   dto.receivable_id,
        };
    }

    private mapPaymentToDto(payment: Payment): PaymentDto {
        return {
            id: payment.id,
            creation_date:  payment.creationDate.toISOString(),
            merchant_id: payment.merchantId,
            transaction_id: payment.transactionId,
            receivable_id: payment.receivableId,
        };
    }

    private handleError(customMsj:string, error: any): void {
        if (error.response) {                      
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            
        } else if (error.request) {            
            console.log(error.request);
        } else {            
            console.log('Error', error.message);
        }
        
        throw new CustomError(customMsj, HttpStatusCode.InternalServerError);
    }
}