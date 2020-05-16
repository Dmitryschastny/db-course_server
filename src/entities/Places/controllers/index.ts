import { Places } from '../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads places by id
 */
const getById = async (request: Request, response: Response) => {
  const placesRepository = getManager().getRepository(Places);

  const place = await placesRepository.findOne(request.params.id);

  if (!place) {
    response.status(404);
    response.end();

    return;
  }

  response.send(place);
};

/**
 * Loads all places
 */
const getAll = async (request: Request, response: Response) => {
  const placesRepository = getManager().getRepository(Places);

  const places = await placesRepository.find();

  response.send(places);
};

export { getById, getAll };
