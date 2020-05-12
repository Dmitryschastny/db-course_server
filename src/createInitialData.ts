import { Languages } from './entities/Languages/index';
import { getManager } from 'typeorm';

const createInitialData = async () => {
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
        name: 'Russian',
        code: 'RU',
      })
    );
  }
};

export { createInitialData };
