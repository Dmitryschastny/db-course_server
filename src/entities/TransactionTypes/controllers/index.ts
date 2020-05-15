import { TransactionTypes } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads transaction types
 */
const getById = async (request: Request, response: Response) => {
  const transactionTypesRepository = getManager().getRepository(
    TransactionTypes
  );

  const transactionType = await transactionTypesRepository.findOne(
    request.params.id
  );

  if (!transactionType) {
    response.status(404);
    response.end();

    return;
  }

  response.send(transactionType);
};

/**
 * Loads all transactionTypes
 */
const getAll = async (request: Request, response: Response) => {
  const transactionTypesRepository = getManager().getRepository(
    TransactionTypes
  );

  const transactionTypes = await transactionTypesRepository.find();

  response.send(transactionTypes);
};

export { getById, getAll };
