import { AccountTypes } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads account types by id
 */
const getById = async (request: Request, response: Response) => {
  const accountTypesRepository = getManager().getRepository(AccountTypes);

  const accountType = await accountTypesRepository.findOne(request.params.id);

  if (!accountType) {
    response.status(404);
    response.end();

    return;
  }

  response.send(accountType);
};

/**
 * Loads account types
 */
const getAll = async (request: Request, response: Response) => {
  const accountTypesRepository = getManager().getRepository(AccountTypes);

  const accountTypes = await accountTypesRepository.find();

  response.send(accountTypes);
};

export { getById, getAll };
