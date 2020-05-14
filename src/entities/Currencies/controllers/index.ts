import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Currencies } from '..';

/**
 * Loads Currencies by id
 */
const getById = async (request: Request, response: Response) => {
  const currenciesRepository = getManager().getRepository(Currencies);

  const currencies = await currenciesRepository.findOne(request.params.id);

  if (!currencies) {
    response.status(404);
    response.end();

    return;
  }

  response.send(currencies);
};

/**
 * Loads all currencies
 */
const getAll = async (request: Request, response: Response) => {
  const currenciesRepository = getManager().getRepository(Currencies);

  const currencies = await currenciesRepository.find();

  response.send(currencies);
};

export { getById, getAll };
