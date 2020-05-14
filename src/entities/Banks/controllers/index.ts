import { Banks } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads Currencies by id
 */
const getById = async (request: Request, response: Response) => {
  const banksRepository = getManager().getRepository(Banks);

  const banks = await banksRepository.findOne(request.params.id);

  if (!banks) {
    response.status(404);
    response.end();

    return;
  }

  response.send(banks);
};

/**
 * Loads all banks
 */
const getAll = async (request: Request, response: Response) => {
  const banksRepository = getManager().getRepository(Banks);

  const banks = await banksRepository.find();

  response.send(banks);
};

export { getById, getAll };
