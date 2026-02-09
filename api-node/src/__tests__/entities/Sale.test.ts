import { Sale } from '../../entities/Sale';

describe('Sale Entity', () => {
    it('should create a valid Sale instance', () => {
        const sale = new Sale('100', '1', false, 'INVOO1', 50.0);

        expect(sale.productCode).toBe('100');
        expect(sale.companyCode).toBe('1');
        expect(sale.isReversal).toBe(false);
        expect(sale.documentNumber).toBe('INVOO1');
        expect(sale.value).toBe(50.0);
    });

    it('should update properties correctly', () => {
        const sale = new Sale('100', '1', false, 'INVOO1', 50.0);

        sale.productCode = '200';
        sale.companyCode = '2';
        sale.isReversal = true;
        sale.documentNumber = 'INV002';
        sale.value = 100.0;

        expect(sale.productCode).toBe('200');
        expect(sale.companyCode).toBe('2');
        expect(sale.isReversal).toBe(true);
        expect(sale.documentNumber).toBe('INV002');
        expect(sale.value).toBe(100.0);
    });
});
