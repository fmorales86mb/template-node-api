import { NextFunction, Request, Response } from "express";

export interface IPaymentController{
    create(req:Request, res: Response, next: NextFunction):Promise<void>;
}