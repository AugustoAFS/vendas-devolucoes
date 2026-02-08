import { Knex } from 'knex';
import { ITransactionRepository } from './interfaces/ITransactionRepository';


export class TransactionRepository implements ITransactionRepository {
    private readonly tableName = 'transactions';

    constructor(private readonly database: Knex) { }

    async findAll(): Promise<any[]> {
        const data = await this.database(this.tableName).select('*');
        return data;
    }

    async clearAll(): Promise<void> {
        await this.database(this.tableName).del();
    }

    async saveMany(transactions: any[]): Promise<void> {
        if (transactions.length > 0) {
            await this.database.batchInsert(this.tableName, transactions, 50);
        }
    }
}

