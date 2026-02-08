import { CsvService } from '../../services/CsvService';
import { ITransactionRepository } from '../../repositories/interfaces/ITransactionRepository';
import fs from 'fs';
import path from 'path';

// Mock Repository
class MockTransactionRepository implements ITransactionRepository {
    public savedTransactions: any[] = [];
    public clearAllCalled = false;

    async saveMany(transactions: any[]): Promise<void> {
        this.savedTransactions = transactions;
    }

    async clearAll(): Promise<void> {
        this.clearAllCalled = true;
    }

    async findAll(): Promise<any[]> {
        return [];
    }
}

describe('CsvService', () => {
    let service: CsvService;
    let repository: MockTransactionRepository;
    const tempCsvPath = path.join(__dirname, 'temp_test.csv');

    beforeEach(() => {
        repository = new MockTransactionRepository();
        service = new CsvService(repository);
    });

    afterEach(() => {
        if (fs.existsSync(tempCsvPath)) {
            fs.unlinkSync(tempCsvPath);
        }
    });

    it('should import transactions from CSV correctly', async () => {
        // Create a temporary CSV file
        const csvContent =
            `cd_produto,tp_valor,cd_empresa,round,nr_dctoorigem,nr_sequencia,cd_valor,cd_historico,in_estorno,dt_movimento,dt_cadastro
100,C,1,50.00,INV001,1,10,5,F,2025-01-01,2025-01-01
200,D,2,100.00,INV002,2,20,6,T,2025-02-01,2025-02-01`;

        fs.writeFileSync(tempCsvPath, csvContent);

        const count = await service.importFromCsv(tempCsvPath);

        expect(count).toBe(2);
        expect(repository.clearAllCalled).toBe(true);
        expect(repository.savedTransactions).toHaveLength(2);

        const first = repository.savedTransactions[0];
        expect(first.cd_produto).toBe(100);
        expect(first.round).toBe(50.00);
        expect(first.nr_dctoorigem).toBe('INV001');
        expect(first.in_estorno).toBe('F');

        const second = repository.savedTransactions[1];
        expect(second.cd_produto).toBe(200);
        expect(second.round).toBe(100.00);
        expect(second.in_estorno).toBe('T');
    });

    it('should handle empty CSV file', async () => {
        const csvContent = "";
        fs.writeFileSync(tempCsvPath, csvContent);

        const csvContentHeaders = `cd_produto,tp_valor,cd_empresa,round,nr_dctoorigem,nr_sequencia,cd_valor,cd_historico,in_estorno,dt_movimento,dt_cadastro`;
        fs.writeFileSync(tempCsvPath, csvContentHeaders);

        const count = await service.importFromCsv(tempCsvPath);

        expect(count).toBe(0);
        expect(repository.clearAllCalled).toBe(true);
        expect(repository.savedTransactions).toHaveLength(0);
    });
});
