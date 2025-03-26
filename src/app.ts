import express from 'express';
import { PaymentRouter } from './application/router';
import { errorHandler } from './commons/middlewares/ErrorHandler';

const app = express();
app.use(express.json());

app.use('/api/v1/payments', PaymentRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	errorHandler(err, req, res, next);
});

export { app };