import { API_CONFIG, getApiUrl } from '../configs/config';
import { TransactionPair } from '../entities/Transaction';

export class TransactionService {

  static async getAllTransactions() {
    try {
      const url = getApiUrl(API_CONFIG.endpoints.transactions);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map(item => TransactionPair.fromApiResponse(item));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  static async getTransactionByDocumentNumber(documentNumber) {
    try {
      const transactions = await this.getAllTransactions();
      return transactions.find(t => t.documentNumber === documentNumber) || null;
    } catch (error) {
      console.error('Error fetching transaction by document number:', error);
      throw error;
    }
  }

  static async getStatistics() {
    try {
      const transactions = await this.getAllTransactions();
      
      const totalSales = transactions.reduce((sum, t) => 
        sum + (t.transaction.sale?.value || 0), 0
      );
      
      const totalRefunds = transactions.reduce((sum, t) => 
        sum + (t.transaction.refund?.value || 0), 0
      );
      
      const refundRate = totalSales > 0 
        ? ((totalRefunds / totalSales) * 100).toFixed(2) 
        : 0;

      return {
        totalTransactions: transactions.length,
        totalSales,
        totalRefunds,
        refundRate: parseFloat(refundRate),
        completePairs: transactions.filter(t => t.isComplete()).length
      };
    } catch (error) {
      console.error('Error calculating statistics:', error);
      throw error;
    }
  }
}
