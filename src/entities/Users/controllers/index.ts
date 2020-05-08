import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Users } from '..';
import * as jwt from 'jsonwebtoken';

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

  const newUser = usersRepository.create(request.body);

  await usersRepository.save(newUser);

  response.send(newUser);
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

export { create, getAll, getById, auth };
