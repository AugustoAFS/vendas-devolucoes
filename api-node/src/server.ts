import path from 'path';
import { createApp } from './app';
import { testConnection, closeConnection } from './data/connection';
import { CsvService } from './services/CsvService';
import { TransactionRepository } from './repositories/TransactionRepository';
import { database } from './data/connection';

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to database');
    }

    await database.migrate.latest();
    const csvFilePath = path.resolve(__dirname, '../vendas_e_devolucoes.csv');
    const transactionRepository = new TransactionRepository(database);
    const csvService = new CsvService(transactionRepository);

    try {
      const importedCount = await csvService.importFromCsv(csvFilePath);
      console.log(`Imported ${importedCount} transactions from CSV`);
    } catch (error) {
      console.error('Failed to import CSV:', error);
      console.log('Continuing without CSV import...');
    }

    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });

    process.on('SIGTERM', async () => {
      server.close(async () => {
        await closeConnection();
        process.exit(0);
      });
    });


  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
