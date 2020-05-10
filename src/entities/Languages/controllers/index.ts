import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Languages } from '..';

/**
 * Loads language by a given id.
 */
const getById = async (request: Request, response: Response) => {
  const languagesRepository = getManager().getRepository(Languages);

  const language = await languagesRepository.findOne(request.params.id);

  if (!language) {
    response.status(404);
    response.end();

    return;
  }

  response.send(language);
};

/**
 * Loads languages
 */
const getAll = async (request: Request, response: Response) => {
  const languagesRepository = getManager().getRepository(Languages);

  const languages = await languagesRepository.find();

  response.send(languages);
};

export { getById, getAll };
