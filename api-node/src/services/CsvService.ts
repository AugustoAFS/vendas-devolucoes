import fs from 'fs';
import csvParser from 'csv-parser';
import { ITransactionRepository } from '../repositories/interfaces/ITransactionRepository';
import { ICsvService } from './interfaces/ICsvService';

interface CsvRow {
    cd_produto: string;
    tp_valor: string;
    cd_empresa: string;
    round: string;
    nr_dctoorigem: string;
    nr_sequencia: string;
    cd_valor: string;
    cd_historico: string;
    in_estorno: string;
    dt_movimento: string;
    dt_cadastro: string;
}

export class CsvService implements ICsvService {
    constructor(private readonly transactionRepository: ITransactionRepository) { }

    async importFromCsv(filePath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const transactions: any[] = [];

            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (row: CsvRow) => {
                    try {
                        const transaction = this.parseCsvRow(row);
                        transactions.push(transaction);
                    } catch (error) {
                        console.error('Error parsing row:', error);
                    }
                })
                .on('end', async () => {
                    try {
                        console.log(`Parsed ${transactions.length} transactions from CSV`);

                        await this.transactionRepository.clearAll();

                        await this.transactionRepository.saveMany(transactions);

                        console.log(`Successfully imported ${transactions.length} transactions`);
                        resolve(transactions.length);
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }

    private parseCsvRow(row: CsvRow): any {
        return {
            cd_produto: parseInt(row.cd_produto, 10),
            tp_valor: row.tp_valor,
            cd_empresa: parseInt(row.cd_empresa, 10),
            round: parseFloat(row.round),
            nr_dctoorigem: row.nr_dctoorigem,
            nr_sequencia: parseInt(row.nr_sequencia, 10),
            cd_valor: parseInt(row.cd_valor, 10),
            cd_historico: parseInt(row.cd_historico, 10),
            in_estorno: row.in_estorno,
            dt_movimento: new Date(row.dt_movimento),
            dt_cadastro: new Date(row.dt_cadastro),
        };
    }
}
