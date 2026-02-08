export class Sale {
  private Cd_Product: number;
  private Cd_Company: number;
  private Is_Reversal: boolean;
  private Invoice: string;
  private Value: number;

  constructor(cd_product: number, cd_company: number, is_reversal: boolean, invoice: string, value: number) {
    this.Cd_Product = cd_product;
    this.Cd_Company = cd_company;
    this.Is_Reversal = is_reversal;
    this.Invoice = invoice;
    this.Value = value;
  }

  getCdProduct(): number {
    return this.Cd_Product;
  }

  getCdCompany(): number {
    return this.Cd_Company;
  }

  getIsReversal(): boolean {
    return this.Is_Reversal;
  }

  getInvoice(): string {
    return this.Invoice;
  }

  getValue(): number {
    return this.Value;
  }

  setCdProduct(cd_product: number): void {
    if (!cd_product || typeof cd_product !== 'number') {
      throw new Error('Código do produto inválido');
    }
    this.Cd_Product = cd_product;
  }

  setCdCompany(cd_company: number): void {
    if (!cd_company || typeof cd_company !== 'number') {
      throw new Error('Código da empresa inválido');
    }
    this.Cd_Company = cd_company;
  }

  setIsReversal(is_reversal: boolean): void {
    if (typeof is_reversal !== 'boolean') {
      throw new Error('is_reversal deve ser boolean');
    }
    this.Is_Reversal = is_reversal;
  }

  setInvoice(invoice: string): void {
    if (!invoice || typeof invoice !== 'string') {
      throw new Error('Nota fiscal inválida');
    }
    this.Invoice = invoice;
  }

  setValue(value: number): void {
    if (typeof value !== 'number' || value < 0) {
      throw new Error('Valor inválido');
    }
    this.Value = value;
  }
}
