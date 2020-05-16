import { Transactions } from '../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads transaction by id
 */
const getById = async (request: Request, response: Response) => {
  const transactionsRepository = getManager().getRepository(Transactions);

  const transaction = await transactionsRepository.findOne(request.params.id);

  if (!transaction) {
    response.status(404);
    response.end();

    return;
  }

  response.send(transaction);
};

/**
 * Loads all transactions
 */
const getAll = async (request: Request, response: Response) => {
  const transactionsRepository = getManager().getRepository(Transactions);

  const transactions = await transactionsRepository.find();

  response.send(transactions);
};

export { getById, getAll };
