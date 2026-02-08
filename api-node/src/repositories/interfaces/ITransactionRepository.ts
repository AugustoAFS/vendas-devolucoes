export interface ITransactionRepository {
    findAll(): Promise<any[]>;
    clearAll(): Promise<void>;
    saveMany(transactions: any[]): Promise<void>;
}
