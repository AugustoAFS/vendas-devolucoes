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
    let mapper: any;

    beforeEach(() => {
        repository = new MockTransactionRepository();

        mapper = {
            map: (source: any, _sourceKey: string, _destinationKey: any) => {
                const baseObject = {
                    productCode: source.cd_produto,
                    companyCode: source.cd_empresa,
                    documentNumber: source.nr_dctoorigem,
                    value: source.round
                };

                if (source.in_estorno === 'F') {
                    return { ...baseObject, isReversal: false };
                }
                return { ...baseObject, isReversal: true };
            }
        };

        service = new TransactionService(repository, mapper);
    });

    const createMockTransaction = (
        cd_produto: string,
        cd_empresa: string,
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
            const sale = createMockTransaction('200', '3', 40, '33333', 'F');
            const refund = createMockTransaction('200', '3', 40, '33333', 'T');

            await repository.saveMany([sale, refund]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0].getSale()).toMatchObject({
                productCode: '200',
                companyCode: '3',
                isReversal: false,
                value: 40,
                documentNumber: '33333'
            });
            expect(result[0].getRefund()).toMatchObject({
                productCode: '200',
                companyCode: '3',
                isReversal: true,
                value: 40,
                documentNumber: '33333'
            });
        });

        it('should handle multiple pairs correctly', async () => {
            // Arrange
            const pair1Sale = createMockTransaction('100', '1', 10, 'INV001', 'F');
            const pair1Refund = createMockTransaction('100', '1', 10, 'INV001', 'T');
            const pair2Sale = createMockTransaction('200', '2', 20, 'INV002', 'F');
            const pair2Refund = createMockTransaction('200', '2', 20, 'INV002', 'T');

            await repository.saveMany([pair1Sale, pair1Refund, pair2Sale, pair2Refund]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);
            expect(result.find(r => r.getSale()?.documentNumber === 'INV001')).toBeDefined();
            expect(result.find(r => r.getSale()?.documentNumber === 'INV002')).toBeDefined();
        });

        it('should filter out unpaired sales (sales without refund)', async () => {
            // Arrange
            const saleOnly = createMockTransaction('300', '3', 30, 'INV_ALONE', 'F');

            await repository.saveMany([saleOnly]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(0);
        });

        it('should handle complex scenarios with mixed order', async () => {
            // Arrange
            const sale1 = createMockTransaction('1', '1', 10, 'A', 'F');
            const refund2 = createMockTransaction('2', '2', 20, 'B', 'T');
            const sale2 = createMockTransaction('2', '2', 20, 'B', 'F');
            const refund1 = createMockTransaction('1', '1', 10, 'A', 'T');

            await repository.saveMany([sale1, refund2, sale2, refund1]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);
            const invoiceA = result.find(r => r.getSale()?.documentNumber === 'A');
            const invoiceB = result.find(r => r.getSale()?.documentNumber === 'B');

            expect(invoiceA).toBeDefined();
            expect(invoiceA!.getSale().value).toBe(10);
            expect(invoiceA!.getRefund().value).toBe(10);

            expect(invoiceB).toBeDefined();
            expect(invoiceB!.getSale().value).toBe(20);
            expect(invoiceB!.getRefund().value).toBe(20);
        });

        it('should handle same invoice with multiple different products', async () => {
            // Arrange
            const sale1 = createMockTransaction('100', '1', 10, 'INV_MULTI', 'F');
            const sale2 = createMockTransaction('200', '1', 20, 'INV_MULTI', 'F');

            const refund1 = createMockTransaction('100', '1', 10, 'INV_MULTI', 'T');
            const refund2 = createMockTransaction('200', '1', 20, 'INV_MULTI', 'T');

            await repository.saveMany([sale1, sale2, refund1, refund2]);

            // Act
            const result = await service.getAllTransactions();

            // Assert
            expect(result).toHaveLength(2);

            const transProduct1 = result.find(r => r.getSale()?.productCode === '100');
            const transProduct2 = result.find(r => r.getSale()?.productCode === '200');

            expect(transProduct1).toBeDefined();
            expect(transProduct1!.getSale().documentNumber).toBe('INV_MULTI');
            expect(transProduct1!.getRefund().productCode).toBe('100');

            expect(transProduct2).toBeDefined();
            expect(transProduct2!.getSale().documentNumber).toBe('INV_MULTI');
            expect(transProduct2!.getRefund().productCode).toBe('200');
        });
    });
});
