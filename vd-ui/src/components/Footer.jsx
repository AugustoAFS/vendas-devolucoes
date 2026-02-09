import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sistema VD</h3>
          <p className="footer-description">
            Plataforma de gestão de vendas e devoluções com análise em tempo real.
          </p>
        </div>

        <div className="footer-section">
          <h4>Recursos</h4>
          <ul className="footer-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#relatorios">Relatórios</a></li>
            <li><a href="#analytics">Analytics</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Suporte</h4>
          <ul className="footer-links">
            <li><a href="#documentacao">Documentação</a></li>
            <li><a href="#ajuda">Central de Ajuda</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Desenvolvido por</h4>
          <p className="footer-brand">AFS</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Sistema de Vendas e Devoluções. Todos os direitos reservados.</p>
        <div className="footer-legal">
          <a href="#privacidade">Privacidade</a>
          <span className="separator">•</span>
          <a href="#termos">Termos de Uso</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
