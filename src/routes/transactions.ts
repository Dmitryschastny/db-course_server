import { Route, CreateRoutes } from '.';
import { getAll, getById, create } from '../entities/Transactions/controllers';

export const createRoutes: CreateRoutes = (base: string): Route[] => [
  {
    path: `/${base}`,
    method: 'get',
    action: getAll,
    protected: true,
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
