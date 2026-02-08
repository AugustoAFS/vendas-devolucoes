import { ITransactionRepository } from '../repositories/interfaces/ITransactionRepository';
import { ITransactionService } from './interfaces/ITransactionService';

export class TransactionService implements ITransactionService {
    constructor(private readonly transactionRepository: ITransactionRepository) { }

    async getAllTransactions(): Promise<any[]> {
        const data = await this.transactionRepository.findAll();
        const sales = data.filter((transaction: any) => transaction.in_estorno === 'F');
        const refunds = data.filter((transaction: any) => transaction.in_estorno === 'T');

        const refundMap = new Map<string, any>();
        refunds.forEach((refund: any) => {
            const key = `${refund.nr_dctoorigem}-${refund.cd_produto}`;
            refundMap.set(key, refund);
        });

        const transactions: any[] = [];

        sales.forEach((sale: any) => {
            const key = `${sale.nr_dctoorigem}-${sale.cd_produto}`;
            const refund = refundMap.get(key);

            if (refund) {
                transactions.push({
                    invoice: sale.nr_dctoorigem,
                    transacation: {
                        sale: {
                            product: sale.cd_produto,
                            company: sale.cd_empresa,
                            is_reversal: false,
                            value: sale.round
                        },
                        refund: {
                            product: refund.cd_produto,
                            company: refund.cd_empresa,
                            is_reversal: true,
                            value: refund.round
                        }
                    }
                });
            }
        });

        return transactions;
    }
}
