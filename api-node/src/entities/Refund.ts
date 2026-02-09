export class Refund {
    public productCode: string;
    public companyCode: string;
    public isReversal: boolean;
    public documentNumber: string;
    public value: number;

    constructor(productCode: string, companyCode: string, isReversal: boolean, documentNumber: string, value: number) {
        this.productCode = productCode;
        this.companyCode = companyCode;
        this.isReversal = isReversal;
        this.documentNumber = documentNumber;
        this.value = value;
    }
}