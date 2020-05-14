import { Request, Response } from 'express';
import { createRoutes as createUsersRoutes } from './users';
import { createRoutes as createLanguagesRoutes } from './languages';
import { createRoutes as createSettingsRoutes } from './settings';
import { createRoutes as createCurrenciesRoutes } from './currencies';

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
];
