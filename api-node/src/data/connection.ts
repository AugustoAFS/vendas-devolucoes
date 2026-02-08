import knex from 'knex';
import databaseConfig from '../config/database.config';

export const database = knex(databaseConfig);

export async function testConnection(): Promise<boolean> {
    try {
        await database.raw('SELECT 1');
        console.log('Database connection successful');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
}

export async function closeConnection(): Promise<void> {
    await database.destroy();
    console.log('Database connection closed');
}
