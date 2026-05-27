# Guia de Configuração - Gestão Financeira

Este guia explica como configurar e rodar o projeto (Backend e Frontend) em uma nova máquina.

## Pré-requisitos
- Node.js instalado (v18 ou superior)
- Git (opcional, para clonar)
- Celular com o app **Expo Go** instalado (para testar o Frontend)

---

## 🖥️ 1. Configuração do Backend (Node.js)

O backend utiliza Express, SQLite e Knex. Siga os passos abaixo:

1. Abra o terminal e navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados (Cria as tabelas e popula com as categorias iniciais):
   ```bash
   npm run migrate
   npm run seed
   ```

4. Inicie o servidor:
   ```bash
   npm run start
   ```
   *O servidor rodará em `http://localhost:3000`.*

---

## 📱 2. Configuração do Frontend (React Native + Expo)

1. Abra um **novo terminal** na raiz do projeto:
   ```bash
   # Certifique-se de estar na pasta raiz (pratica01)
   npm install
   ```

2. **Configuração de IP (Importante para testes no Celular):**
   Se você for testar em um dispositivo físico usando o Expo Go, você deve alterar o endereço do servidor para o IP da sua máquina.
   - Abra o arquivo `services/api.js`.
   - Substitua `localhost` pelo seu IP local (Ex: `192.168.1.10`).
   ```javascript
   // services/api.js
   const api = axios.create({
     baseURL: 'http://SEU_IP_AQUI:3000', 
   });
   ```

3. Inicie o Expo:
   ```bash
   npm start
   ```

4. No celular, abra o app **Expo Go** e escaneie o QR Code que aparecerá no terminal.

---

## 🛠️ Scripts Úteis

### Backend
- `npm run start`: Inicia o servidor com Nodemon (reinicia automaticamente ao salvar).
- `npm run migrate`: Cria as tabelas do banco de dados do zero.
- `npm run seed`: Reseta e insere as categorias padrão.

### Frontend
- `npm start`: Inicia o servidor de desenvolvimento do Expo.
- `npm run android`: Inicia o app diretamente em um emulador Android.
- `npm run ios`: Inicia o app diretamente em um emulador iOS.

---

## 📂 Estrutura do Projeto
- `/backend`: API Node.js, Banco de Dados SQLite (Knex) e Coleção Postman.
- `/components`: Componentes reutilizáveis do React Native.
- `/screens`: Telas da aplicação (Login, Resumo, Gerenciar).
- `/store`: Contexto de autenticação.
- `/services`: Configuração do Axios para chamadas à API.
