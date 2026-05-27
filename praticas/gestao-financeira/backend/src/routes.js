const express = require('express');
const CategoryController = require('./controllers/CategoryController');
const TransactionController = require('./controllers/TransactionController');

const routes = express.Router();

// Health Check
routes.get('/', (req, res) => {
  return res.json({ ok: true, name: "gestao-financeira-api" });
});

// Categories
routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.create);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

// Transactions
routes.get('/transactions', TransactionController.index);
routes.post('/transactions', TransactionController.create);
routes.put('/transactions/:id', TransactionController.update);
routes.delete('/transactions/:id', TransactionController.delete);

module.exports = routes;
