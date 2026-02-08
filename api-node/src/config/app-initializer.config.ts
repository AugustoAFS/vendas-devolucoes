import { database } from '../data/connection';
import { CsvService } from '../services/CsvService';
import { TransactionRepository } from '../repositories/TransactionRepository';
import path from 'path';

const transactionRepository = new TransactionRepository(database);
const csvService = new CsvService(transactionRepository);

export class AppInitializer {
    async initialize(): Promise<void> {
        console.log('[App Initializer] Iniciando aplicação...');

        try {
            await this.checkDatabaseConnection();
            await this.importCSVData();

            console.log('[App Initializer] Aplicação iniciada com sucesso!');
        } catch (error) {
            console.error('[App Initializer] Erro durante inicialização:', error);
            throw error;
        }
    }

    private async checkDatabaseConnection(): Promise<void> {
        try {
            await database.raw('SELECT 1');
            console.log('[App Initializer] Conexão com banco de dados estabelecida');
        } catch (error) {
            console.error('[App Initializer] Erro ao conectar com banco de dados');
            throw error;
        }
    }

    private async importCSVData(): Promise<void> {
        try {
            console.log('[App Initializer] Importando dados do CSV...');
            const csvFilePath = path.resolve(__dirname, '../vendas_e_devolucoes.csv');
            await csvService.importFromCsv(csvFilePath);
            console.log('[App Initializer] Dados do CSV importados com sucesso');
        } catch (error) {
            console.error('[App Initializer] Erro ao importar CSV:', (error as Error).message);
            console.warn('[App Initializer] Aplicação continuará sem os dados do CSV');
        }
    }
}

export default new AppInitializer();
