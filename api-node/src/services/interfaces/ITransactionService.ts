export interface ITransactionService {
    getAllTransactions(): Promise<any[]>;
}