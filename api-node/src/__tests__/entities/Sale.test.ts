import { Sale } from '../../entities/Sale';

describe('Sale Entity', () => {
    it('should create a valid Sale instance', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);

        expect(sale.getCdProduct()).toBe(100);
        expect(sale.getCdCompany()).toBe(1);
        expect(sale.getIsReversal()).toBe(false);
        expect(sale.getInvoice()).toBe('INVOO1');
        expect(sale.getValue()).toBe(50.0);
    });

    it('should update properties correctly via setters', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);

        sale.setCdProduct(200);
        sale.setCdCompany(2);
        sale.setIsReversal(true);
        sale.setInvoice('INV002');
        sale.setValue(100.0);

        expect(sale.getCdProduct()).toBe(200);
        expect(sale.getCdCompany()).toBe(2);
        expect(sale.getIsReversal()).toBe(true);
        expect(sale.getInvoice()).toBe('INV002');
        expect(sale.getValue()).toBe(100.0);
    });

    it('should throw error for invalid product code', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);
        expect(() => sale.setCdProduct(0)).toThrow('Código do produto inválido');
    });

    it('should throw error for invalid company code', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);
        expect(() => sale.setCdCompany(0)).toThrow('Código da empresa inválido');
    });

    it('should throw error for invalid invoice', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);
        // @ts-ignore
        expect(() => sale.setInvoice('')).toThrow('Nota fiscal inválida');
    });

    it('should throw error for invalid value', () => {
        const sale = new Sale(100, 1, false, 'INVOO1', 50.0);
        expect(() => sale.setValue(-10)).toThrow('Valor inválido');
    });
});
