const connection = require('../database/connection');
const { transactionSchema } = require('../schemas');

module.exports = {
  async index(req, res) {
    const transactions = await connection('transactions')
      .join('categories', 'categories.id', '=', 'transactions.categoryId')
      .select([
        'transactions.*',
        'categories.name as categoryName',
        'categories.displayName as categoryDisplayName',
        'categories.icon as categoryIcon',
        'categories.background as categoryBackground',
        'categories.isIncome as categoryIsIncome'
      ]);

    // Format nested category
    const formattedTransactions = transactions.map(t => ({
      id: t.id,
      description: t.description,
      value: t.value,
      date: t.date,
      categoryId: t.categoryId,
      category: {
        id: t.categoryId,
        name: t.categoryName,
        displayName: t.categoryDisplayName,
        icon: t.categoryIcon,
        background: t.categoryBackground,
        isIncome: !!t.categoryIsIncome
      }
    }));

    return res.json(formattedTransactions);
  },

  async create(req, res) {
    const validation = transactionSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: "Dados inválidos", 
        details: validation.error.flatten().fieldErrors 
      });
    }

    const { description, value, date, categoryId } = validation.data;

    try {
      const [id] = await connection('transactions').insert({
        description,
        value,
        date,
        categoryId
      });

      const transaction = await connection('transactions')
        .where('transactions.id', id)
        .join('categories', 'categories.id', '=', 'transactions.categoryId')
        .select([
          'transactions.*',
          'categories.name as categoryName',
          'categories.displayName as categoryDisplayName',
          'categories.icon as categoryIcon',
          'categories.background as categoryBackground',
          'categories.isIncome as categoryIsIncome'
        ])
        .first();

      return res.status(201).json({
        id: transaction.id,
        description: transaction.description,
        value: transaction.value,
        date: transaction.date,
        category: {
          id: transaction.categoryId,
          name: transaction.categoryName,
          displayName: transaction.categoryDisplayName,
          icon: transaction.categoryIcon,
          background: transaction.categoryBackground,
          isIncome: !!transaction.categoryIsIncome
        }
      });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar transação" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const validation = transactionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ 
        error: "Dados inválidos", 
        details: validation.error.flatten().fieldErrors 
      });
    }

    const { description, value, date, categoryId } = validation.data;

    await connection('transactions')
      .where('id', id)
      .update({
        description,
        value,
        date,
        categoryId
      });

    return res.status(200).json({ id, description, value, date, categoryId });
  },

  async delete(req, res) {
    const { id } = req.params;

    await connection('transactions').where('id', id).delete();

    return res.status(204).send();
  }
};
