import { Countries } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads countries by id
 */
const getById = async (request: Request, response: Response) => {
  const countriesRepository = getManager().getRepository(Countries);

  const countries = await countriesRepository.findOne(request.params.id);

  if (!countries) {
    response.status(404);
    response.end();

    return;
  }

  response.send(countries);
};

/**
 * Loads all countries
 */
const getAll = async (request: Request, response: Response) => {
  const countriesRepository = getManager().getRepository(Countries);

  const countries = await countriesRepository.find();

  response.send(countries);
};

export { getById, getAll };
