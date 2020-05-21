import { Roles } from './entities/Roles/index';
import { Icons } from './entities/Icons/index';
import { Categories } from './entities/Categories/index';
import { TransactionTypes } from './entities/TransactionTypes/index';
import { AccountTypes } from './entities/AccountTypes/index';
import { Users } from './entities/Users';
import { Banks } from './entities/Banks';
import { Countries } from './entities/Countries';
import { Currencies } from './entities/Currencies';
import { Languages } from './entities/Languages';
import { getManager } from 'typeorm';

const setupRoles = async () => {
  const rolesRepository = getManager().getRepository(Roles);

  await rolesRepository.save([
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Basic user' },
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

const setupIcons = async () => {
  const iconsRepository = getManager().getRepository(Icons);

  await iconsRepository.save([
    { id: 1, name: 'directions_car' },
    { id: 2, name: 'subway' },
    { id: 3, name: 'phone' },
    { id: 4, name: 'fastfood' },
    { id: 5, name: 'menu_book' },
    { id: 6, name: 'beach_access' },
    { id: 7, name: 'card_giftcard' },
    { id: 8, name: 'local_grocery_store' },
    { id: 9, name: 'healing' },
    { id: 10, name: 'child_friendly' },
    { id: 11, name: 'spa' },
    { id: 12, name: 'store' },
    { id: 13, name: 'cake' },
    { id: 14, name: 'attach_money' },
  ]);
};

const setupCategories = async () => {
  const categoriesRepository = getManager().getRepository(Categories);

  await categoriesRepository.save([
    // Expense
    { id: 1, name: 'Auto', icon: { id: 1 }, transactionType: { id: 1 } },
    { id: 2, name: 'Transport', icon: { id: 2 }, transactionType: { id: 1 } },
    { id: 3, name: 'Bills', icon: { id: 3 }, transactionType: { id: 1 } },
    { id: 4, name: 'Eating out', icon: { id: 4 }, transactionType: { id: 1 } },
    { id: 5, name: 'Education', icon: { id: 5 }, transactionType: { id: 1 } },
    {
      id: 6,
      name: 'Entertaining',
      icon: { id: 6 },
      transactionType: { id: 1 },
    },
    { id: 7, name: 'Gifts', icon: { id: 7 }, transactionType: { id: 1 } },
    { id: 8, name: 'Groceries', icon: { id: 8 }, transactionType: { id: 1 } },
    { id: 9, name: 'Health', icon: { id: 9 }, transactionType: { id: 1 } },
    { id: 10, name: 'Kids', icon: { id: 10 }, transactionType: { id: 1 } },
    {
      id: 11,
      name: 'Personal Care',
      icon: { id: 11 },
      transactionType: { id: 1 },
    },
    { id: 12, name: 'Shopping', icon: { id: 12 }, transactionType: { id: 1 } },

    // Income
    { id: 13, name: 'Birthday', icon: { id: 13 }, transactionType: { id: 2 } },
    { id: 14, name: 'Salary', icon: { id: 14 }, transactionType: { id: 2 } },
  ]);
};

const setupAccountTypes = async () => {
  const accountTypesRepository = getManager().getRepository(AccountTypes);

  await accountTypesRepository.save([
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Card' },
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
      exchangeFactor: 1,
    },
    {
      id: 2,
      name: 'Belarusian ruble',
      code: 'BYN',
      exchangeFactor: 0.42,
    },
  ]);
};

const setupUsers = async () => {
  const usersRepository = getManager().getRepository(Users);

  await usersRepository.save([
    {
      id: 1,
      email: 'test@test.test',
      password: '123456',
      settings: {
        id: 1,
        language: { id: 1 },
        mainCurrency: { id: 1 },
      },
      role: { id: 2 },
    },
    {
      id: 2,
      email: 'admin@admin.admin',
      password: '123456',
      settings: {
        id: 2,
        language: { id: 1 },
        mainCurrency: { id: 1 },
      },
      role: { id: 1 },
    },
  ]);
};

const createInitialData = async () => {
  await setupRoles();
  await setupTransactionTypes();
  await setupIcons();
  await setupCategories();
  await setupAccountTypes();
  await setupCountries();
  await setupBanks();
  await setupLanguages();
  await setupCurrencies();
  await setupUsers();
};

export { createInitialData };
