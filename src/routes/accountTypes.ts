import { Route, CreateRoutes } from '.';
import { getAll, getById } from '../entities/AccountTypes/controllers';

export const createRoutes: CreateRoutes = (base: string): Route[] => [
  {
    path: `/${base}`,
    method: 'get',
    action: getAll,
  },
  {
    path: `/${base}/:id`,
    method: 'get',
    action: getById,
  },
];
