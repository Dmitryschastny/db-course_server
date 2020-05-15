import { Banks } from './../../Banks/index';
import { AccountTypes } from './../../AccountTypes';
import { Currencies } from './../../Currencies';
import { Cards } from './../../Cards';
import { CreateAccountRequest } from './types';
import { Accounts } from './../';
import { Response } from 'express';
import { Request, VerifiedRequest } from '../../../types';
import { getManager } from 'typeorm';
import { Users } from '../../Users';

/**
 * Saves given account.
 */
const create = async (
  request: VerifiedRequest<CreateAccountRequest>,
  response: Response
) => {
  try {
    const accountsRepository = getManager().getRepository(Accounts);

    const {
      accountTypeId,
      currencyId,
      bankId,
      cardNumber,
      name,
    } = request.body;

    const currenciesRepository = getManager().getRepository(Currencies);
    const currency = await currenciesRepository.findOne(currencyId);

    const accountTypesRepository = getManager().getRepository(AccountTypes);
    const type = await accountTypesRepository.findOne(accountTypeId);

    const {
      decoded: { email },
    } = request;

    const usersRepository = getManager().getRepository(Users);
    const user = await usersRepository.findOne(null, {
      where: { email },
    });

    const newAccount: any = { currency, type, user, name };

    if (accountTypeId === 2) {
      const banksRepository = getManager().getRepository(Banks);
      const bank = await banksRepository.findOne(bankId);

      const cardsRepository = getManager().getRepository(Cards);
      const card = await cardsRepository.save({ number: cardNumber, bank });
      newAccount.card = card;
    }

    await accountsRepository.save(newAccount);

    response.send(newAccount);
  } catch (error) {
    console.log(error);
    response.send(400);
  }
};

/**
 * Loads accounts by id
 */
const getById = async (request: Request<any>, response: Response) => {
  const accountsRepository = getManager().getRepository(Accounts);

  const account = await accountsRepository.findOne(request.params.id);

  if (!account) {
    response.status(404);
    response.end();

    return;
  }

  response.send(account);
};

/**
 * Loads all accounts
 */
const getAll = async (request: VerifiedRequest<any>, response: Response) => {
  const {
    decoded: { email },
  } = request;

  const usersRepository = getManager().getRepository(Users);
  const user = await usersRepository.findOne(null, {
    where: { email },
  });

  const accountsRepository = getManager().getRepository(Accounts);

  const accounts = await accountsRepository.find({
    where: { user },
    relations: ['card', 'currency', 'type'],
  });

  response.send(accounts);
};

export { getById, getAll, create };
