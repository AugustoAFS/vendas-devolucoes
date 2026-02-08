import { Transaction } from '../../entities/Transaction';
import { Sale } from '../../entities/Sale';
import { Refund } from '../../entities/Refund';

describe('Transaction Entity', () => {
    it('should create a valid Transaction instance', () => {
        const sale = new Sale(100, 1, false, 'INV001', 50.0);
        const refund = new Refund(100, 1, true, 'INV001', 50.0);

        const transaction = new Transaction(sale, refund);

        expect(transaction.getSale()).toBe(sale);
        expect(transaction.getRefund()).toBe(refund);
        expect(transaction.getSale().getCdProduct()).toBe(100);
        expect(transaction.getRefund().getIsReversal()).toBe(true);
    });

    it('should update sale correctly', () => {
        const sale1 = new Sale(100, 1, false, 'INV001', 50.0);
        const refund = new Refund(100, 1, true, 'INV001', 50.0);
        const transaction = new Transaction(sale1, refund);

        const sale2 = new Sale(200, 2, false, 'INV002', 100.0);
        transaction.setSale(sale2);

        expect(transaction.getSale()).toBe(sale2);
        expect(transaction.getSale().getCdProduct()).toBe(200);
    });

    it('should update refund correctly', () => {
        const sale = new Sale(100, 1, false, 'INV001', 50.0);
        const refund1 = new Refund(100, 1, true, 'INV001', 50.0);
        const transaction = new Transaction(sale, refund1);

        const refund2 = new Refund(200, 2, true, 'INV002', 100.0);
        transaction.setRefund(refund2);

        expect(transaction.getRefund()).toBe(refund2);
        expect(transaction.getRefund().getCdProduct()).toBe(200);
    });
});
