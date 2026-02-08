import { TransactionService } from '../../services/TransactionService';
import { ITransactionRepository } from '../../repositories/interfaces/ITransactionRepository';
import { Sale } from '../../entities/Sale';

// Mock Repository Implementation
class MockTransactionRepository implements ITransactionRepository {
    private transactions: any[] = [];

    async findAll(): Promise<Sale[]> {
        return this.transactions as any[];
    }

    async clearAll(): Promise<void> {
        this.transactions = [];
    }

    async saveMany(transactions: any[]): Promise<void> {
        this.transactions.push(...transactions);
    }
}

describe('TransactionService', () => {
    let repository: MockTransactionRepository;
    let service: TransactionService;

    beforeEach(() => {
        repository = new MockTransactionRepository();
        service = new TransactionService(repository);
    });

    const createMockTransaction = (
        cd_produto: number,
        cd_empresa: number,
        round: number,
        nr_dctoorigem: string,
        in_estorno: 'T' | 'F'
    ) => ({
        cd_produto,
        cd_empresa,
        round,
        nr_dctoorigem,
        in_estorno,
        dt_movimento: new Date(),
        dt_cadastro: new Date(),
    });

    describe('getAllTransactions', () => {
        it('should pair a sale with its matching refund', async () => {
            // Arrange
            const sale = createMockTransaction(200, 3, 40, '33333', 'F');
            const refund = createMockTransaction(200, 3, 40, '33333', 'T');

            await repository.saveMany([sale, refund]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                invoice: '33333',
                transaction: {
                    sale: {
                        product: 200,
                        company: 3,
                        is_reversal: false,
                        value: 40,
                    },
                    refund: {
                        product: 200,
                        company: 3,
                        is_reversal: true,
                        value: 40,
                    },
                },
            });
        });

        it('should handle multiple pairs correctly', async () => {
            // Arrange
            const pair1Sale = createMockTransaction(100, 1, 10, 'INV001', 'F');
            const pair1Refund = createMockTransaction(100, 1, 10, 'INV001', 'T');
            const pair2Sale = createMockTransaction(200, 2, 20, 'INV002', 'F');
            const pair2Refund = createMockTransaction(200, 2, 20, 'INV002', 'T');

            await repository.saveMany([pair1Sale, pair1Refund, pair2Sale, pair2Refund]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);
            expect(result.find(r => r.invoice === 'INV001')).toBeDefined();
            expect(result.find(r => r.invoice === 'INV002')).toBeDefined();
        });

        it('should filter out unpaired sales (sales without refund)', async () => {
            // Arrange
            const saleOnly = createMockTransaction(300, 3, 30, 'INV_ALONE', 'F');

            await repository.saveMany([saleOnly]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(0);
        });

        it('should handle complex scenarios with mixed order', async () => {
            // Arrange
            const sale1 = createMockTransaction(1, 1, 10, 'A', 'F');
            const refund2 = createMockTransaction(2, 2, 20, 'B', 'T');
            const sale2 = createMockTransaction(2, 2, 20, 'B', 'F');
            const refund1 = createMockTransaction(1, 1, 10, 'A', 'T');

            await repository.saveMany([sale1, refund2, sale2, refund1]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);
            const invoiceA = result.find(r => r.invoice === 'A');
            const invoiceB = result.find(r => r.invoice === 'B');

            expect(invoiceA).toBeDefined();
            expect(invoiceA.transaction.sale.value).toBe(10);
            expect(invoiceA.transaction.refund.value).toBe(10);

            expect(invoiceB).toBeDefined();
            expect(invoiceB.transaction.sale.value).toBe(20);
            expect(invoiceB.transaction.refund.value).toBe(20);
        });

        it('should handle same invoice with multiple different products', async () => {
            // Arrange
            const sale1 = createMockTransaction(100, 1, 10, 'INV_MULTI', 'F');
            const sale2 = createMockTransaction(200, 1, 20, 'INV_MULTI', 'F');

            const refund1 = createMockTransaction(100, 1, 10, 'INV_MULTI', 'T');
            const refund2 = createMockTransaction(200, 1, 20, 'INV_MULTI', 'T');

            await repository.saveMany([sale1, sale2, refund1, refund2]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);

            const transProduct1 = result.find(r => r.transaction.sale.product === 100);
            const transProduct2 = result.find(r => r.transaction.sale.product === 200);

            expect(transProduct1).toBeDefined();
            expect(transProduct1.invoice).toBe('INV_MULTI');
            expect(transProduct1.transaction.refund.product).toBe(100);

            expect(transProduct2).toBeDefined();
            expect(transProduct2.invoice).toBe('INV_MULTI');
            expect(transProduct2.transaction.refund.product).toBe(200);
        });
    });
});
