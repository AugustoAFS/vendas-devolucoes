import { Refund } from '../../entities/Refund';

describe('Refund Entity', () => {
    it('should create a valid Refund instance', () => {
        const refund = new Refund('100', '1', true, 'INVOO1', 50.0);

        expect(refund.productCode).toBe('100');
        expect(refund.companyCode).toBe('1');
        expect(refund.isReversal).toBe(true);
        expect(refund.documentNumber).toBe('INVOO1');
        expect(refund.value).toBe(50.0);
    });

    it('should update properties correctly', () => {
        const refund = new Refund('100', '1', true, 'INVOO1', 50.0);

        refund.productCode = '200';
        refund.companyCode = '2';
        refund.isReversal = false;
        refund.documentNumber = 'INV002';
        refund.value = 100.0;

        expect(refund.productCode).toBe('200');
        expect(refund.companyCode).toBe('2');
        expect(refund.isReversal).toBe(false);
        expect(refund.documentNumber).toBe('INV002');
        expect(refund.value).toBe(100.0);
    });
});
