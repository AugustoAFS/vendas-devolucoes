import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './src/data/vendas_devolucoes.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, './src/data/migrations'),
      extension: 'ts',
      loadExtensions: ['.ts']
    },
    seeds: {
      directory: path.resolve(__dirname, './src/data/seeds')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './src/data/vendas_devolucoes.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, './src/data/migrations'),
      extension: 'ts',
      loadExtensions: ['.ts']
    },
    seeds: {
      directory: path.resolve(__dirname, './src/data/seeds')
    },
    useNullAsDefault: true
  }
};

export default config;
module.exports = config;
