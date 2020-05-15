import { Cards } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads card by id
 */
const getById = async (request: Request, response: Response) => {
  const cardsRepository = getManager().getRepository(Cards);

  const card = await cardsRepository.findOne(request.params.id);

  if (!card) {
    response.status(404);
    response.end();

    return;
  }

  response.send(card);
};

/**
 * Loads all cards
 */
const getAll = async (request: Request, response: Response) => {
  const cardsRepository = getManager().getRepository(Cards);

  const cards = await cardsRepository.find();

  response.send(cards);
};

export { getById, getAll };
