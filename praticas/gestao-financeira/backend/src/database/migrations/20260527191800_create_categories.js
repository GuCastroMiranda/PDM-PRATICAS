exports.up = function(knex) {
  return knex.schema.createTable('categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('displayName').notNullable();
    table.string('icon').notNullable();
    table.string('background').notNullable();
    table.boolean('isIncome').notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
