const knex = require('knex');
const path = require('path');

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
