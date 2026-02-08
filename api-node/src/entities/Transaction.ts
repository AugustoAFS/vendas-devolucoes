import { Refund } from "./Refund";
import { Sale } from "./Sale";

export class Transaction {
    private sale: Sale;
    private refund: Refund;

    constructor(sale: Sale, refund: Refund) {
        this.sale = sale;
        this.refund = refund;
    }

    getSale(): Sale {
        return this.sale;
    }

    getRefund(): Refund {
        return this.refund;
    }

    setSale(sale: Sale): void {
        this.sale = sale;
    }

    setRefund(refund: Refund): void {
        this.refund = refund;
    }
}