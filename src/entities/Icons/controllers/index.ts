import { Icons } from './../';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';

/**
 * Loads icon
 */
const getById = async (request: Request, response: Response) => {
  const iconsRepository = getManager().getRepository(Icons);

  const icon = await iconsRepository.findOne(request.params.id);

  if (!icon) {
    response.status(404);
    response.end();

    return;
  }

  response.send(icon);
};

/**
 * Loads all icons
 */
const getAll = async (request: Request, response: Response) => {
  const iconsRepository = getManager().getRepository(Icons);

  const icons = await iconsRepository.find();

  response.send(icons);
};

export { getById, getAll };
