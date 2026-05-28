exports.up = function(knex) {
  return knex.schema.createTable('transactions', function(table) {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.date('date').notNullable();
    table.integer('categoryId').unsigned().notNullable();
    table.foreign('categoryId').references('id').inTable('categories');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
