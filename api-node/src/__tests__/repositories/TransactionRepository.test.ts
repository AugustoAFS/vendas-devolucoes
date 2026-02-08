import { TransactionRepository } from '../../repositories/TransactionRepository';

// Mock Knex
const mockQueryBuilder = {
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    del: jest.fn().mockResolvedValue(undefined),
    toSQL: jest.fn().mockReturnThis(),
    batchInsert: jest.fn(),
};

const mockKnex = jest.fn(() => mockQueryBuilder) as any;
mockKnex.batchInsert = jest.fn().mockResolvedValue(undefined);

describe('TransactionRepository', () => {
    let repository: TransactionRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new TransactionRepository(mockKnex);
    });

    describe('findAll', () => {
        it('should call knex.select with correct table and columns', async () => {
            const expectedResult = [{ cd_produto: 1, nr_dctoorigem: 'INV001', in_estorno: 'F' }];
            mockQueryBuilder.select.mockResolvedValue(expectedResult);

            const result = await repository.findAll();

            expect(mockKnex).toHaveBeenCalledWith('transactions');
            expect(mockQueryBuilder.select).toHaveBeenCalledWith('*');
            expect(result).toBe(expectedResult);
        });
    });

    describe('saveMany', () => {
        it('should call knex.batchInsert with correct parameters', async () => {
            const transactions = [{ id: 1 }, { id: 2 }];

            await repository.saveMany(transactions);

            expect(mockKnex.batchInsert).toHaveBeenCalledWith('transactions', transactions, 50);
        });

        it('should NOT call knex.batchInsert if transactions array is empty', async () => {
            await repository.saveMany([]);

            expect(mockKnex.batchInsert).not.toHaveBeenCalled();
        });
    });

    describe('clearAll', () => {
        it('should call knex.del on correct table', async () => {
            await repository.clearAll();

            expect(mockKnex).toHaveBeenCalledWith('transactions');
            expect(mockQueryBuilder.del).toHaveBeenCalled();
        });
    });
});
