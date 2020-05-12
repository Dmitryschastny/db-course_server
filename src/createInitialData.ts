import { Currencies } from './entities/Currencies';
import { Languages } from './entities/Languages';
import { getManager } from 'typeorm';

const setupLanguages = async () => {
  const languagesRepository = getManager().getRepository(Languages);

  const languages = await languagesRepository.find();

  if (!languages.length) {
    await languagesRepository.save(
      languagesRepository.create({
        name: 'English',
        code: 'EN',
      })
    );

    await languagesRepository.save(
      languagesRepository.create({
        name: 'Русский',
        code: 'RU',
      })
    );
  }
};

const setupCurrencies = async () => {
  const currenciesRepository = getManager().getRepository(Currencies);

  const currencies = await currenciesRepository.find();

  if (!currencies.length) {
    await currenciesRepository.save(
      currenciesRepository.create({
        name: 'Belarusian ruble',
        code: 'BYN',
      })
    );

    await currenciesRepository.save(
      currenciesRepository.create({
        name: 'United States Dollar',
        code: 'USD',
      })
    );
  }
};

const createInitialData = async () => {
  await setupLanguages();
  await setupCurrencies();
};

export { createInitialData };
