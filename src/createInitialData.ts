import { Users } from './entities/Users';
import { Banks } from './entities/Banks';
import { Countries } from './entities/Countries';
import { Currencies } from './entities/Currencies';
import { Languages } from './entities/Languages';
import { getManager } from 'typeorm';

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
  await setupCountries();
  await setupBanks();
  await setupLanguages();
  await setupCurrencies();
  await setupUsers();
};

export { createInitialData };
