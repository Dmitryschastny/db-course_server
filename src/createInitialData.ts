import { Categories } from './entities/Categories/index';
import { TransactionTypes } from './entities/TransactionTypes/index';
import { AccountTypes } from './entities/AccountTypes/index';
import { Users } from './entities/Users';
import { Banks } from './entities/Banks';
import { Countries } from './entities/Countries';
import { Currencies } from './entities/Currencies';
import { Languages } from './entities/Languages';
import { getManager } from 'typeorm';

const setupCategories = async () => {
  const categoriesRepository = getManager().getRepository(Categories);

  await categoriesRepository.save([
    // Expense
    { id: 1, name: 'Auto', transactionType: { id: 1 } },
    { id: 2, name: 'Transport', transactionType: { id: 1 } },
    { id: 3, name: 'Bills', transactionType: { id: 1 } },
    { id: 4, name: 'Eating out', transactionType: { id: 1 } },
    { id: 5, name: 'Education', transactionType: { id: 1 } },
    { id: 6, name: 'Education', transactionType: { id: 1 } },
    { id: 7, name: 'Entertaining', transactionType: { id: 1 } },
    { id: 8, name: 'Gifts', transactionType: { id: 1 } },
    { id: 9, name: 'Groceries', transactionType: { id: 1 } },
    { id: 10, name: 'Health', transactionType: { id: 1 } },
    { id: 11, name: 'Kids', transactionType: { id: 1 } },
    { id: 12, name: 'Personal Care', transactionType: { id: 1 } },
    { id: 13, name: 'Shopping', transactionType: { id: 1 } },

    // Income
    { id: 14, name: 'Birthday', transactionType: { id: 2 } },
    { id: 15, name: 'Salary', transactionType: { id: 2 } },
  ]);
};

const setupTransactionTypes = async () => {
  const transactionTypesRepository = getManager().getRepository(
    TransactionTypes
  );

  await transactionTypesRepository.save([
    { id: 1, name: 'Expense' },
    { id: 2, name: 'Income' },
    { id: 3, name: 'Debt' },
    { id: 4, name: 'Transfer' },
  ]);
};

const setupAccountTypes = async () => {
  const accountTypesRepository = getManager().getRepository(AccountTypes);

  await accountTypesRepository.save([
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Card' },
    { id: 3, name: 'Debt' },
  ]);
};

const setupCountries = async () => {
  const countriesRepository = getManager().getRepository(Countries);

  await countriesRepository.save([
    { id: 1, name: 'United States' },
    { id: 2, name: 'Россия' },
    { id: 3, name: 'Беларусь' },
  ]);
};

const setupBanks = async () => {
  const banksRepository = getManager().getRepository(Banks);

  await banksRepository.save([
    { id: 1, name: 'Альфа-Банк', country: { id: 2 } },
    { id: 2, name: 'Альфа-Банк', country: { id: 3 } },
    { id: 3, name: 'МТБанк', country: { id: 3 } },
    { id: 4, name: 'Приорбанк', country: { id: 3 } },
  ]);
};

const setupLanguages = async () => {
  const languagesRepository = getManager().getRepository(Languages);

  await languagesRepository.save([
    { id: 1, name: 'English', code: 'EN' },
    { id: 2, name: 'Русский', code: 'RU' },
  ]);
};

const setupCurrencies = async () => {
  const currenciesRepository = getManager().getRepository(Currencies);

  await currenciesRepository.save([
    {
      id: 1,
      name: 'United States Dollar',
      code: 'USD',
    },
    {
      id: 2,
      name: 'Belarusian ruble',
      code: 'BYN',
    },
  ]);
};

const setupUsers = async () => {
  const usersRepository = getManager().getRepository(Users);

  await usersRepository.save({
    id: 1,
    email: 'test@test.test',
    password: '123456',
    settings: {
      id: 0,
      usePin: false,
      language: { id: 1 },
      mainCurrency: { id: 1 },
    },
  });
};

const createInitialData = async () => {
  await setupTransactionTypes();
  await setupCategories();
  await setupAccountTypes();
  await setupCountries();
  await setupBanks();
  await setupLanguages();
  await setupCurrencies();
  await setupUsers();
};

export { createInitialData };
