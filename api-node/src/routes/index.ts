import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { TransactionService } from '../services/TransactionService';
import { TransactionRepository } from '../repositories/TransactionRepository';
import { database } from '../data/connection';

const routes = Router();

// Instanciar dependências
const transactionRepository = new TransactionRepository(database);
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Listar transações pareadas
 *     description: Retorna pares de venda e devolução agrupados por nota fiscal (invoice).
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Lista de pares encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
routes.get('/transactions', transactionController.getAllTransactions.bind(transactionController));

export default routes;

