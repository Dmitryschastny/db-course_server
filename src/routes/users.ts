import { Route, CreateRoutes } from '.';
import { create, getAll, getById } from '../entities/Users/controllers';

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
  {
    path: `/${base}`,
    method: 'post',
    action: create,
  },
];
