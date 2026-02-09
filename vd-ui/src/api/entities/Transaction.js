export class Sale {
    constructor(productCode, companyCode, isReversal, documentNumber, value) {
        this.productCode = productCode;
        this.companyCode = companyCode;
        this.isReversal = isReversal;
        this.documentNumber = documentNumber;
        this.value = value;
    }
}

export class Refund {
    constructor(productCode, companyCode, isReversal, documentNumber, value) {
        this.productCode = productCode;
        this.companyCode = companyCode;
        this.isReversal = isReversal;
        this.documentNumber = documentNumber;
        this.value = value;
    }
}

export class TransactionPair {
    constructor(documentNumber, sale, refund) {
        this.documentNumber = documentNumber;
        this.transaction = {
            sale: sale || null,
            refund: refund || null
        };
    }

    isComplete() {
        return this.transaction.sale !== null && this.transaction.refund !== null;
    }

    getTotalValue() {
        return this.transaction.sale?.value || 0;
    }

    static fromApiResponse(data) {
        const sale = data.sale 
            ? new Sale(
                data.sale.productCode,
                data.sale.companyCode,
                data.sale.isReversal,
                data.sale.documentNumber,
                data.sale.value
              )
            : null;

        const refund = data.refund
            ? new Refund(
                data.refund.productCode,
                data.refund.companyCode,
                data.refund.isReversal,
                data.refund.documentNumber,
                data.refund.value
              )
            : null;

        const documentNumber = sale?.documentNumber || refund?.documentNumber || 'N/A';
        return new TransactionPair(documentNumber, sale, refund);
    }
}
