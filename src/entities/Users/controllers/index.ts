import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Users } from '..';

/**
 * Saves given user.
 */
const create = async (request: Request, response: Response) => {
  // get a post repository to perform operations with post
  const usersRepository = getManager().getRepository(Users);

  // create a real post object from post json object sent over http
  const newUser = usersRepository.create(request.body);

  // save received post
  await usersRepository.save(newUser);

  // return saved post back
  response.send(newUser);
};

/**
 * Loads all posts from the database.
 */
const getAll = async (request: Request, response: Response) => {
  // get a post repository to perform operations with post
  const usersRepository = getManager().getRepository(Users);

  // load a post by a given post id
  const users = await usersRepository.find();

  // return loaded posts
  response.send(users);
};

/**
 * Loads post by a given id.
 */
const getById = async (request: Request, response: Response) => {
  // get a post repository to perform operations with post
  const usersRepository = getManager().getRepository(Users);

  // load a post by a given post id
  const user = await usersRepository.findOne(request.params.id);

  // if post was not found return 404 to the client
  if (!user) {
    response.status(404);
    response.end();

    return;
  }

  // return loaded post
  response.send(user);
};

export { create, getAll, getById };
