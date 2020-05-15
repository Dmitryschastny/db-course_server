import { Request, Response } from 'express';
import { createRoutes as createUsersRoutes } from './users';
import { createRoutes as createLanguagesRoutes } from './languages';
import { createRoutes as createSettingsRoutes } from './settings';
import { createRoutes as createCurrenciesRoutes } from './currencies';
import { createRoutes as createCountriesRoutes } from './countries';
import { createRoutes as createBanksRoutes } from './banks';
import { createRoutes as createAccountTypesRoutes } from './accountTypes';
import { createRoutes as createCardsRoutes } from './cards';
import { createRoutes as createAccountsRoutes } from './accounts';
import { createRoutes as createTransactionTypesRoutes } from './transactionTypes';

export type Route = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  action(request: Request, response: Response): Promise<any>;
  protected?: boolean;
};

export type CreateRoutes = (base: string) => Route[];

export const AppRoutes: Route[] = [
  ...createUsersRoutes('users'),
  ...createLanguagesRoutes('languages'),
  ...createSettingsRoutes('settings'),
  ...createCurrenciesRoutes('currencies'),
  ...createCountriesRoutes('countries'),
  ...createBanksRoutes('banks'),
  ...createAccountTypesRoutes('account-types'),
  ...createCardsRoutes('cards'),
  ...createAccountsRoutes('accounts'),
  ...createTransactionTypesRoutes('transaction-types'),
];
