# Sistema de Vendas e Devoluções - DajuLabs

Aplicação fullstack para gerenciamento e visualização de vendas e devoluções, desenvolvida como teste técnico para DajuLabs.

## 📋 Descrição

Sistema que processa um arquivo CSV contendo dados de vendas e devoluções, pareia as transações relacionadas e exibe em uma interface web moderna e responsiva.

## 🏗️ Arquitetura do Projeto

```
vendas-devolucoes/
├── api-node/          # Backend - API REST (Node.js + TypeScript)
└── vd-ui/             # Frontend - Interface (React + Vite)
```

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** com TypeScript
- **Express** - Framework web
- **SQLite** - Banco de dados
- **Knex.js** - Query builder e migrations
- **automapper/core** - Mapeamento de objetos
- **Jest** - Testes unitários
- **Swagger** - Documentação API

### Frontend
- **React 19** - Biblioteca UI
- **Vite** - Build tool
- **Custom Hooks** - Gerenciamento de estado
- **CSS3** - Estilização responsiva

## ⚡ Início Rápido

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### 1. Backend (api-node)

```bash
# Navegue até o diretório do backend
cd api-node

# Instale as dependências
npm install

# Execute as migrations do banco de dados
npm run migrate

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:3333`

### 2. Frontend (vd-ui)

```bash
# Em outro terminal, navegue até o diretório do frontend
cd vd-ui

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📊 Funcionalidades

### Backend
- ✅ Importação automática de CSV ao iniciar
- ✅ Pareamento inteligente de vendas e devoluções
- ✅ API REST com endpoint GET /api/transactions
- ✅ Documentação Swagger em /api-docs && /api-docs.json
- ✅ Testes unitários
- ✅ Princípios SOLID: Single Responsibility, Dependency Inversion e Open/Closed
- ✅ Orientação a Objetos

### Frontend
- ✅ Listagem de transações pareadas
- ✅ Visualização de vendas e devoluções
- ✅ Design responsivo (mobile e desktop)
- ✅ Custom hook para comunicação com API
- ✅ Componentes reutilizáveis
- ✅ Estados de loading e erro

## 📝 Endpoints da API

### GET /api/transactions
Retorna todas as transações pareadas (vendas + devoluções)

**Resposta:**
```json
[
  {
    "invoice": "34567",
    "transacation": {
      "sale": {
        "product": 200,
        "company": 2,
        "is_reversal": false,
        "value": 40
      },
      "refund": {
        "product": 200,
        "company": 2,
        "is_reversal": true,
        "value": 40
      }
    }
  }
]
```

## 🧪 Testes

### Backend
```bash
cd api-node

# Executar todos os testes
npm test

```

## 👨‍💻 Desenvolvimento

Consulte os READMEs específicos de cada projeto:
- [Backend README](./api-node/README.md)
- [Frontend README](./vd-ui/README.md)

## 📄 Licença

ISC