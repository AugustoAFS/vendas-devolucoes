import { Transaction } from '../entities/Transaction';
import { Sale } from '../entities/Sale';
import { Refund } from '../entities/Refund';
import { ITransactionRepository } from '../repositories/interfaces/ITransactionRepository';
import { ITransactionService } from './interfaces/ITransactionService';
import { Mapper } from '@automapper/core';
import { TransactionData } from '../mappers/TransactionProfile';

export class TransactionService implements ITransactionService {
    constructor(
        private readonly transactionRepository: ITransactionRepository,
        private readonly mapper: Mapper
    ) { }

    async getAllTransactions(): Promise<Transaction[]> {
        const data = await this.transactionRepository.findAll();
        const sales = data.filter((transaction: any) => transaction.in_estorno === 'F');
        const refunds = data.filter((transaction: any) => transaction.in_estorno === 'T');

        const refundMap = new Map<string, TransactionData>();
        refunds.forEach((refund: TransactionData) => {
            const key = `${refund.nr_dctoorigem}-${refund.cd_produto}`;
            refundMap.set(key, refund);
        });

        const transactions: Transaction[] = [];

        sales.forEach((sale: TransactionData) => {
            const key = `${sale.nr_dctoorigem}-${sale.cd_produto}`;
            const refund = refundMap.get(key);

            if (refund) {
                const transaction = new Transaction();

                const saleEntity = this.mapper.map(sale, TransactionData, Sale);
                const refundEntity = this.mapper.map(refund, TransactionData, Refund);

                transaction.setSale(saleEntity);
                transaction.setRefund(refundEntity);

                transactions.push(transaction);
            }
        });

        return transactions;
    }
}