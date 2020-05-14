import { Banks } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads Currencies by id
 */
const getById = async (request: Request, response: Response) => {
  const banksRepository = getManager().getRepository(Banks);

  const bank = await banksRepository.findOne(request.params.id, {
    relations: ['country'],
  });

  if (!bank) {
    response.status(404);
    response.end();

    return;
  }

  response.send(bank);
};

/**
 * Loads all banks
 */
const getAll = async (request: Request, response: Response) => {
  const banksRepository = getManager().getRepository(Banks);

  const banks = await banksRepository.find({ relations: ['country'] });

  response.send(banks);
};

export { getById, getAll };
