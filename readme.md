# 📦 Gerenciador de Estoque

Sistema completo de gerenciamento de estoque desenvolvido com TypeScript, React, Node.js e Prisma.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 🚀 Funcionalidades

- ✅ **CRUD completo** de produtos
- 📊 **Dashboard** com estatísticas em tempo real
- 🏷️ **Gerenciamento de categorias**
- 🔍 **Busca e filtros** avançados
- ⚠️ **Alertas de estoque baixo**
- 📥📤 **Controle de movimentações** (entrada/saída)
- 📜 **Histórico de movimentações**
- ✔️ **Validação de dados** no frontend e backend

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Zod** (validação)
- **Axios**

### Frontend
- **React** + **TypeScript**
- **Vite**
- **Axios** (requisições HTTP)
- **Zod** (validação)
- **CSS3** (estilização)

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/stock-manager.git
cd stock-manager
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/stock_manager?schema=public"
PORT=3001
```

Execute as migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Inicie o servidor:

```bash
npm run dev
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

Inicie o frontend:

```bash
npm run dev
```

## 🌐 Acesso

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **API Docs:** http://localhost:3001/api

## 📁 Estrutura do Projeto

```
stock-manager/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── validators/
│   │   └── server.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## 🎯 Como Usar

1. **Criar Categorias:** Acesse a aba "Categorias" e adicione categorias para seus produtos
2. **Cadastrar Produtos:** Vá em "Produtos" e clique em "Novo Produto"
3. **Gerenciar Estoque:** Use "Movimentações" para registrar entradas e saídas
4. **Acompanhar:** Visualize estatísticas no Dashboard

## 🚀 Deploy

### Backend
- Railway, Render ou Fly.io

### Frontend  
- Vercel ou Netlify

### Banco de Dados
- Neon, Supabase ou Railway

## 📄 API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Busca produto por ID
- `POST /api/products` - Cria novo produto
- `PUT /api/products/:id` - Atualiza produto
- `DELETE /api/products/:id` - Deleta produto

### Categorias
- `GET /api/categories` - Lista todas as categorias
- `POST /api/categories` - Cria nova categoria
- `DELETE /api/categories/:id` - Deleta categoria

### Movimentações
- `GET /api/stock-movements` - Lista movimentações
- `POST /api/stock-movements` - Cria movimentação

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Igor Marinho - [GitHub](https://github.com/IgorMarinho-dev)

---

⭐ Se este projeto te ajudou, deixe uma estrela!