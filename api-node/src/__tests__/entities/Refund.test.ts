import { Refund } from '../../entities/Refund';

describe('Refund Entity', () => {
    it('should create a valid Refund instance', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);

        expect(refund.getCdProduct()).toBe(100);
        expect(refund.getCdCompany()).toBe(1);
        expect(refund.getIsReversal()).toBe(true);
        expect(refund.getInvoice()).toBe('INVOO1');
        expect(refund.getValue()).toBe(50.0);
    });

    it('should update properties correctly via setters', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);

        refund.setCdProduct(200);
        refund.setCdCompany(2);
        refund.setIsReversal(false);
        refund.setInvoice('INV002');
        refund.setValue(100.0);

        expect(refund.getCdProduct()).toBe(200);
        expect(refund.getCdCompany()).toBe(2);
        expect(refund.getIsReversal()).toBe(false);
        expect(refund.getInvoice()).toBe('INV002');
        expect(refund.getValue()).toBe(100.0);
    });

    it('should throw error for invalid product code', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);
        expect(() => refund.setCdProduct(0)).toThrow('Código do produto inválido');
    });

    it('should throw error for invalid company code', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);
        expect(() => refund.setCdCompany(0)).toThrow('Código da empresa inválido');
    });

    it('should throw error for invalid invoice', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);
        // @ts-ignore
        expect(() => refund.setInvoice('')).toThrow('Nota fiscal inválida');
    });

    it('should throw error for invalid value', () => {
        const refund = new Refund(100, 1, true, 'INVOO1', 50.0);
        expect(() => refund.setValue(-10)).toThrow('Valor inválido');
    });
});
