exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del();
  await knex('categories').insert([
    { name: 'food', displayName: 'Alimentação', icon: 'fast-food', background: '#FF9500', isIncome: false },
    { name: 'transport', displayName: 'Transporte', icon: 'car', background: '#5856D6', isIncome: false },
    { name: 'leisure', displayName: 'Lazer', icon: 'game-controller', background: '#AF52DE', isIncome: false },
    { name: 'health', displayName: 'Saúde', icon: 'medical', background: '#FF2D55', isIncome: false },
    { name: 'income', displayName: 'Salário', icon: 'cash', background: '#34C759', isIncome: true }
  ]);
};
