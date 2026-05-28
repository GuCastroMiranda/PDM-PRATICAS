# Guia de Configuração - Gestão Financeira

Este guia explica como configurar e rodar o projeto (Backend e Frontend) em uma nova máquina usando **PostgreSQL**.

## Pré-requisitos
- Node.js instalado (v18 ou superior)
- **PostgreSQL** instalado e rodando na porta 5432
- Celular com o app **Expo Go** instalado (para testar em dispositivo físico)

---

## 🖥️ 1. Configuração do Backend (Node.js + PostgreSQL)

1. **Criação do Banco de Dados:**
   Abra o seu terminal do PostgreSQL ou pgAdmin e crie o banco de dados:
   ```sql
   CREATE DATABASE gestao_financeira;
   ```

2. **Configuração de Credenciais:**
   O projeto está configurado por padrão para usar:
   - **User:** `postgres`
   - **Password:** `postgres`
   
   *Se a sua senha for diferente, altere no arquivo `backend/knexfile.js`.*

3. **Instalação e Migrations:**
   Abra o terminal na pasta `backend`:
   ```bash
   cd backend
   npm install
   npx knex migrate:latest
   npx knex seed:run
   ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```
   *O servidor rodará em `http://localhost:3000`.*

---

## 📱 2. Configuração do Frontend (React Native + Expo)

1. Abra um **novo terminal** na raiz do projeto:
   ```bash
   npm install
   ```

2. **Configuração de IP (Atenção Avaliador):**
   - O projeto está configurado por padrão para `localhost` (funciona em emuladores).
   - Para testar em um **celular físico**, abra o arquivo `services/api.js` e troque `localhost` pelo seu IP local.

3. Inicie o Expo:
   ```bash
   npm start
   ```

---

## 🛠️ Scripts Úteis

### Backend
- `npx knex migrate:latest`: Cria a estrutura das tabelas.
- `npx knex seed:run`: Insere as categorias padrão (Alimentação, Transporte, etc).

### Frontend
- `npm start`: Abre o Metro Bundler do Expo.
- `a`: Pressione no terminal para abrir no emulador Android.
- `r`: Pressione no terminal para recarregar o app.

---

## 📂 Estrutura do Projeto
- `/backend`: API Node.js com PostgreSQL (Knex).
- `/screens`: Telas da aplicação (Resumo, Gerenciar, Categorias).
- `/services/api.js`: Configuração de conexão com o Backend.
