import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Settings } from '..';

/**
 * Loads settings by id
 */
const getById = async (request: Request, response: Response) => {
  const settingsRepository = getManager().getRepository(Settings);

  const settings = await settingsRepository.findOne(request.params.id);

  if (!settings) {
    response.status(404);
    response.end();

    return;
  }

  response.send(settings);
};

export { getById };
