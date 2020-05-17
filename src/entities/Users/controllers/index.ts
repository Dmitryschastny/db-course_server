import { Currencies } from './../../Currencies/index';
import { Settings } from './../../Settings/index';
import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Users } from '..';
import * as jwt from 'jsonwebtoken';
import { VerifiedRequest } from '../../../types';
import { Languages } from '../../Languages';

/**
 * Saves given user.
 */
const create = async (request: Request, response: Response) => {
  const usersRepository = getManager().getRepository(Users);

  const { email } = request.body;
  const existedUser = await usersRepository.findOne(null, {
    select: ['id'],
    where: { email },
  });

  if (existedUser) {
    response.status(409);
    response.end();

    return;
  }

  const languagesRepository = getManager().getRepository(Languages);
  const defaultLanguage = await languagesRepository.findOne({
    where: { code: 'EN' },
  });

  const currenciesRepository = getManager().getRepository(Currencies);
  const defaultCurrency = await currenciesRepository.findOne({
    where: { code: 'USD' },
  });

  const settingsRepository = getManager().getRepository(Settings);
  const settings = settingsRepository.create({
    language: defaultLanguage,
    mainCurrency: defaultCurrency,
  });

  const newUser = usersRepository.create({ ...request.body, settings });

  await usersRepository.save(newUser);

  response.send();
};

/**
 * Updates given user.
 */
const update = async (request: Request, response: Response) => {
  const usersRepository = getManager().getRepository(Users);

  const { settings } = request.body;

  const user = await usersRepository.findOne(request.params.id, {
    relations: ['settings'],
  });

  const languagesRepository = getManager().getRepository(Languages);
  const language = await languagesRepository.findOne(settings.languageId);

  const currenciesRepository = getManager().getRepository(Currencies);
  const mainCurrency = await currenciesRepository.findOne(
    settings.mainCurrencyId
  );

  user.settings = { ...user.settings, ...settings, language, mainCurrency };

  await usersRepository.save(user);

  response.send();
};

/**
 * Loads all posts from the database.
 */
const getAll = async (request: Request, response: Response) => {
  const usersRepository = getManager().getRepository(Users);

  const users = await usersRepository.find();

  response.send(users);
};

/**
 * Loads post by a given id.
 */
const getById = async (request: Request, response: Response) => {
  const usersRepository = getManager().getRepository(Users);

  const user = await usersRepository.findOne(request.params.id);

  if (!user) {
    response.status(404);
    response.end();

    return;
  }

  response.send(user);
};

/**
 * Auth
 */
const auth = async (request: Request, response: Response) => {
  const usersRepository = getManager().getRepository(Users);

  const { email, password } = request.body;
  const user = await usersRepository.findOne(null, {
    select: ['id'],
    where: {
      email,
      password,
    },
  });

  if (!user) {
    response.status(401);
    response.end();

    return;
  }

  const payload = { email };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '2d',
    issuer: 'http://localhost:3000',
  };
  const token = jwt.sign(payload, secret, options);

  response.send({ token });
};

/**
 * Return user by token
 */
const me = async (request: VerifiedRequest<any>, response: Response) => {
  const {
    decoded: { email },
  } = request;

  const usersRepository = getManager().getRepository(Users);
  const { settings, ...user } = await usersRepository.findOne(null, {
    select: ['id', 'email', 'settings'],
    where: {
      email,
    },
    relations: [
      'settings',
      'settings.language',
      'settings.mainCurrency',
      'accounts',
      'accounts.card',
      'accounts.card.bank',
      'accounts.currency',
      'accounts.type',
    ],
  });

  if (!user) {
    response.status(404);
    response.end();

    return;
  }

  response.send({
    user: {
      id: user.id,
      email: user.email,
    },
    settings: {
      language: settings.language,
      mainCurrency: settings.mainCurrency,
    },
    accounts: user.accounts,
  });
};

export { create, update, getAll, getById, auth, me };
