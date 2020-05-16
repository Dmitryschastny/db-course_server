import { Categories } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads categories
 */
const getById = async (request: Request, response: Response) => {
  const categoriesRepository = getManager().getRepository(Categories);

  const category = await categoriesRepository.findOne(request.params.id, {
    relations: ['icon', 'transactionType'],
  });

  if (!category) {
    response.status(404);
    response.end();

    return;
  }

  response.send(category);
};

/**
 * Loads all categories
 */
const getAll = async (request: Request, response: Response) => {
  const categoriesRepository = getManager().getRepository(Categories);

  const categories = await categoriesRepository.find({
    relations: ['icon', 'transactionType'],
  });

  response.send(categories);
};

export { getById, getAll };
