# Teste Técnico – DajuLabs

> **Objetivo:** Avaliar a capacidade de desenvolver uma API REST e interface frontend simples, aplicando boas práticas de programação, organização de código e raciocínio lógico.

---

## 📋 Índice

- [1. Backend – API REST](#1-backend--api-rest)
- [2. Frontend – React.js](#2-frontend--reactjs)
- [3. Diferenciais](#3-diferenciais)
- [4. Critérios de Avaliação](#4-critérios-de-avaliação)

---

## 1. Backend – API REST

### 📝 Descrição

Desenvolva uma API REST que leia uma planilha CSV com dados de vendas e devoluções. A aplicação deve processar os dados e retornar cada item vendido junto ao seu respectivo par de devolução.

### 📊 Estrutura do CSV

O CSV contém uma lista de itens de vendas e devoluções ocorridas durante um período.

**Exemplo de dados:**

| cd_produto | cd_empresa | in_estorno | nrdoctorigem |
|------------|------------|------------|--------------|
| 200        | 2          | F          | 34567        |
| 100        | 2          | F          | 34567        |
| 200        | 2          | T          | 34567        |
| 400        | 3          | F          | 12345        |
| 400        | 3          | T          | 12345        |

**Legenda:**
- `F` - Venda feita
- `T` - Devolução da venda

> ⚠️ **Observação:** A devolução pode estar logo abaixo da venda ou muitas linhas depois.

---

### ✅ Requisitos da Aplicação Backend

1. **Rota GET** - A API deve expor uma rota para retornar os dados no formato solicitado
2. **Tecnologia** - Node.js ou PHP (o que for mais confortável)
3. **Importação CSV** - O CSV deve ser lido e importado para o banco ao iniciar a aplicação
4. **Banco de dados** - SQLite (arquivo local)
5. **Paradigma** - Obrigatório uso de Orientação a Objetos
6. **Algoritmo** - Criar algoritmo que verifica e pareia vendas com devoluções
7. **Formato de retorno** - Seguir o padrão JSON especificado abaixo

### 📤 Formato de Retorno da API

```json
[
  {
    "invoice": "33333",
    "transacation": {
      "sale": {
        "product": 200,
        "company": 3,
        "is_reversal": false,
        "value": 40
      },
      "refund": {
        "product": 200,
        "company": 3,
        "is_reversal": true,
        "value": 40
      }
    }
  },
  {
    "invoice": "44444",
    "transacation": {
      "sale": {
        "product": 300,
        "company": 2,
        "is_reversal": false,
        "value": 20
      },
      "refund": {
        "product": 300,
        "company": 2,
        "is_reversal": true,
        "value": 20
      }
    }
  }
]
```

---

## 2. Frontend – React.js

### 📝 Descrição

Implemente uma tela simples em React para consumir a API criada e exibir todas as vendas junto às suas devoluções.

### ✅ Requisitos da Aplicação Frontend

1. **Framework** - React.js
2. **Hooks** - Obrigatório uso de React Hooks (`useState`, `useEffect`, etc.)
3. **Componentização** - Seguir boas práticas com componentes reutilizáveis
4. **Custom Hook** - Implementar pelo menos um hook customizado para comunicação com a API
5. **Layout** - Simples, mas responsivo e organizado
6. **Exibição** - Lista ou tabela mostrando cada venda com sua respectiva devolução

---

## 3. Diferenciais

### 💎 Itens que podem fazer a diferença

1. **S.O.L.I.D**
   - Implementar **3 princípios** do S.O.L.I.D (quaisquer 3)
   - Não é necessário implementar todos os 5 princípios

2. **Testes Unitários**
   - Desenvolver testes unitários para o código

---

## 4. Critérios de Avaliação

### 📊 Relevância dos Critérios

| Critério | Relevância | Descrição |
|----------|------------|-----------|
| **Backend funcional** | 🔴 **Alta** | O Backend é mais importante que o frontend |
| **Frontend + Backend conectados** | 🟡 Média | Ter os 2 conectados é um plus |
| **Entregar algo** | 🔴 **Alta** | Entregar algo é melhor que entregar nada |
| **Algoritmo de pareamento** | 🔴 **Alta** | Transformar dados do banco no formato solicitado |
| **Capacidade analítica** | 🟡 Média | Criação do algoritmo de verificação |
| **Organização de código** | 🟡 Média | Estrutura e organização do projeto |
| **Nomenclatura em inglês** | 🟡 Média | Bons nomes de variáveis em inglês |

---

## 💡 Lembre-se

> **"Feito é melhor que perfeito"**

Foque em entregar uma solução funcional que atenda aos requisitos principais antes de buscar a perfeição nos detalhes. 