export interface ICsvService {
    importFromCsv(filePath: string): Promise<number>;
}