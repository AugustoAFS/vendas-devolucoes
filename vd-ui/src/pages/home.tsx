import { useTransactions, useTransactionStats } from '../hooks/useTransactions';
import Loading from '../components/Loading';
import '../css/pages.css';

const Home = () => {
  const { transactions, loading: txLoading, error: txError } = useTransactions();
  const { stats, loading: statsLoading, error: statsError } = useTransactionStats();

  const loading = txLoading || statsLoading;
  const error = txError || statsError;

  const formatCurrency = (value: number | undefined): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Bem-vindo ao Sistema de Vendas e Devoluções</p>
      </div>

      {error && (
        <div className="error-message">
          <p>⚠️ Erro ao carregar dados: {error}</p>
        </div>
      )}

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total de Vendas</h3>
          {loading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <>
              <p className="card-value">
                {formatCurrency(stats?.totalSales)}
              </p>
              <span className="card-label">Total geral</span>
            </>
          )}
        </div>

        <div className="card">
          <h3>Devoluções</h3>
          {loading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <>
              <p className="card-value">
                {formatCurrency(stats?.totalRefunds)}
              </p>
              <span className="card-label">Total geral</span>
            </>
          )}
        </div>

        <div className="card">
          <h3>Transações</h3>
          {loading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <>
              <p className="card-value">
                {stats?.totalTransactions || 0}
              </p>
              <span className="card-label">Total de pares</span>
            </>
          )}
        </div>

        <div className="card">
          <h3>Taxa de Devolução</h3>
          {loading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <>
              <p className="card-value">
                {`${stats?.refundRate || 0}%`}
              </p>
              <span className="card-label">Percentual</span>
            </>
          )}
        </div>
      </div>

      <div className="recent-activity">
        <h3>Transações Recentes</h3>
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : transactions.length === 0 ? (
          <p className="empty-state">Nenhuma transação encontrada</p>
        ) : (
          <div className="transactions-list">
            {transactions.slice(0, 5).map((tx: any) => (
              <div key={tx.documentNumber} className="transaction-item">
                <div className="transaction-info">
                  <strong>Nota Fiscal: {tx.documentNumber}</strong>
                  <div className="transaction-details">
                    <span>Produto: {tx.transaction.sale?.productCode}</span>
                    <span>Empresa: {tx.transaction.sale?.companyCode}</span>
                  </div>
                </div>
                <div className="transaction-values">
                  <div className="value-item sale">
                    <span className="label">Venda</span>
                    <span className="value">
                      {formatCurrency(tx.transaction.sale?.value)}
                    </span>
                  </div>
                  <div className="value-item refund">
                    <span className="label">Devolução</span>
                    <span className="value">
                      {formatCurrency(tx.transaction.refund?.value)}
                    </span>
                  </div>
                </div>
                <div className={`status ${tx.isComplete() ? 'complete' : 'incomplete'}`}>
                  {tx.isComplete() ? '✓ Pareado' : '⚠ Incompleto'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
