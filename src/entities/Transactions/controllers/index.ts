import { Places } from './../../Places/index';
import { Categories } from './../../Categories/index';
import { Accounts } from './../../Accounts/index';
import { TransactionTypes } from './../../TransactionTypes/index';
import { Transactions } from '../';
import { Response } from 'express';
import { getManager, In } from 'typeorm';
import { Request, VerifiedRequest } from '../../../types';
import { CreateTransactionRequest, UpdateTransactionRequest } from './types';
import { Users } from '../../Users';

/**
 * Loads transaction by id
 */
const getById = async (request: Request<any>, response: Response) => {
  const transactionsRepository = getManager().getRepository(Transactions);

  const transaction = await transactionsRepository.findOne(request.params.id);

  if (!transaction) {
    response.status(404);
    response.end();

    return;
  }

  response.send(transaction);
};

/**
 * Loads all transactions
 */
const getAll = async (request: VerifiedRequest<any>, response: Response) => {
  const {
    decoded: { email },
  } = request;

  const usersRepository = getManager().getRepository(Users);
  const user = await usersRepository.findOne(null, {
    where: { email },
    relations: ['accounts'],
  });

  const transactionsRepository = getManager().getRepository(Transactions);

  const transactions = await transactionsRepository.find({
    where: {
      account: In(user.accounts.map(a => a.id)),
    },
    relations: [
      'category',
      'category.icon',
      'place',
      'type',
      'account',
      'account.currency',
    ],
    order: {
      date: 'DESC',
    },
  });

  response.send(transactions);
};

/**
 * Saves given user.
 */
const create = async (
  request: Request<CreateTransactionRequest>,
  response: Response
) => {
  try {
    const {
      amount,
      typeId,
      accountId,
      date,
      note,
      categoryId,
      place,
    } = request.body;

    const transactionTypesRepository = getManager().getRepository(
      TransactionTypes
    );
    const type = await transactionTypesRepository.findOne(typeId);

    const accountsRepository = getManager().getRepository(Accounts);
    const account = await accountsRepository.findOne(accountId);

    const newTransaction: any = {
      amount,
      date: new Date(date).toISOString(),
      type,
      account,
    };

    if (note) {
      newTransaction.note = note;
    }

    if (categoryId) {
      const categoriesRepository = getManager().getRepository(Categories);
      const category = await categoriesRepository.findOne(categoryId);

      newTransaction.category = category;
    }

    if (place) {
      const placesRepository = getManager().getRepository(Places);
      let placeEntity = await placesRepository.findOne({
        where: { name: place },
      });

      if (!placeEntity) {
        placeEntity = await placesRepository.save({ name: place });
      }

      newTransaction.place = placeEntity;
    }

    const transactionsRepository = getManager().getRepository(Transactions);
    const { id } = await transactionsRepository.save(newTransaction);

    const result = await transactionsRepository.findOne(id, {
      relations: [
        'category',
        'category.icon',
        'place',
        'type',
        'account',
        'account.currency',
      ],
    });

    response.send(result);
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

const update = async (
  request: Request<UpdateTransactionRequest>,
  response: Response
) => {
  try {
    const {
      amount,
      typeId,
      accountId,
      date,
      note,
      categoryId,
      place,
    } = request.body;

    const transactionsRepository = getManager().getRepository(Transactions);
    const transaction = await transactionsRepository.findOne(
      request.params.id,
      {
        relations: [
          'category',
          'category.icon',
          'place',
          'type',
          'account',
          'account.currency',
        ],
      }
    );

    transaction.amount = amount;
    transaction.type = { id: typeId } as TransactionTypes;
    transaction.account = { id: accountId } as Accounts;
    transaction.date = new Date(date);
    transaction.note = note;
    transaction.category = { id: categoryId } as Categories;

    if (place) {
      const placesRepository = getManager().getRepository(Places);
      let placeEntity = await placesRepository.findOne({
        where: { name: place },
      });

      if (!placeEntity) {
        placeEntity = await placesRepository.save({ name: place });
      }

      transaction.place = placeEntity;
    }

    await transactionsRepository.save(transaction);

    const result = await transactionsRepository.findOne(request.params.id, {
      relations: [
        'category',
        'category.icon',
        'place',
        'type',
        'account',
        'account.currency',
      ],
    });

    response.send(result);
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

const deleteById = async (request: Request<any>, response: Response) => {
  const transactionsRepository = getManager().getRepository(Transactions);

  try {
    await transactionsRepository.delete(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    console.log(error);
    response.sendStatus(400);
  }
};

export { getById, getAll, create, update, deleteById };
