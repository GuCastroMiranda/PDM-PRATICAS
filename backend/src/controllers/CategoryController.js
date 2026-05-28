const connection = require('../database/connection');
const { categorySchema } = require('../schemas');

module.exports = {
  async index(req, res) {
    const categories = await connection('categories').select('*');
    return res.json(categories);
  },

  async create(req, res) {
    const validation = categorySchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: "Dados inválidos", 
        details: validation.error.flatten().fieldErrors 
      });
    }

    const { name, displayName, icon, background, isIncome } = validation.data;

    try {
      const [id] = await connection('categories').insert({
        name,
        displayName,
        icon,
        background,
        isIncome
      });

      return res.status(201).json({ id, name, displayName, icon, background, isIncome });
    } catch (err) {
      return res.status(400).json({ error: "Erro ao criar categoria" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    // Partial update support
    const updates = req.body;

    await connection('categories')
      .where('id', id)
      .update(updates);

    return res.status(200).json({ id, ...updates });
  },

  async delete(req, res) {
    const { id } = req.params;

    const category = await connection('categories').where('id', id).first();

    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    // Standard categories check
    const standardCategories = ['food', 'transport', 'leisure', 'health', 'income'];
    if (standardCategories.includes(category.name)) {
      return res.status(400).json({ error: "Categorias padrão não podem ser excluídas" });
    }

    await connection('categories').where('id', id).delete();

    return res.status(204).send();
  }
};
