import { useState, useEffect } from 'react';
import { TransactionService } from '../api/services/transactionService';

interface TransactionStats {
  totalTransactions: number;
  totalSales: number;
  totalRefunds: number;
  refundRate: number;
  completePairs: number;
}

interface UseTransactionsReturn {
  transactions: any[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseTransactionStatsReturn {
  stats: TransactionStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useTransactions = (): UseTransactionsReturn => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TransactionService.getAllTransactions();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar transações');
      console.error('Error in useTransactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions
  };
};

export const useTransactionStats = (): UseTransactionStatsReturn => {
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TransactionService.getStatistics();
      setStats(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar estatísticas');
      console.error('Error in useTransactionStats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
