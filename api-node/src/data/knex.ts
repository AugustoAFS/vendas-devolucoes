import knex from 'knex';
import databaseConfig from '../config/database.config';

const connection = knex(databaseConfig);

export default connection;
