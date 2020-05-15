import { Route, CreateRoutes } from '.';
import { getAll, getById, create } from '../entities/Accounts/controllers';

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
    protected: true,
  },
  {
    path: `/${base}`,
    method: 'post',
    action: create,
    protected: true,
  },
];
