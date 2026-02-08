import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    async getAllTransactions(_req: Request, res: Response): Promise<void> {
        try {
            const transactions = await this.transactionService.getAllTransactions();

            res.status(200).json(transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'Failed to fetch transactions',
            });
        }
    }
}
