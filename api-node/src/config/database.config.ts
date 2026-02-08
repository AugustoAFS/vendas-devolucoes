import path from 'path';
import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, '../data/vendas_devolucoes.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '../data/migrations'),
    extension: 'ts',
    loadExtensions: ['.ts']
  },
  seeds: {
    directory: path.resolve(__dirname, '../data/seeds')
  },
  useNullAsDefault: true
};

export default config;
