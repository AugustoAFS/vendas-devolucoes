import '../css/Header.css';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="header-title">
              <h1>Sistema de Vendas e Devoluções</h1>
              <p className="subtitle">Gestão inteligente de transações</p>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-info">
            <div className="info-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"/>
                <path d="M8 4a.75.75 0 0 1 .75.75v3.5h2a.75.75 0 0 1 0 1.5h-2.75a.75.75 0 0 1-.75-.75v-4.25A.75.75 0 0 1 8 4z"/>
              </svg>
              <span className="info-text">{currentDate}</span>
            </div>
            <div className="status-indicator">
              <span className="status-dot"></span>
              <span className="status-text">Sistema Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
