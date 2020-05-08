import { Route, CreateRoutes } from '.';
import { create, getAll, getById, auth } from '../entities/Users/controllers';

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
  },
  {
    path: `/auth`,
    method: 'post',
    action: auth,
  },
];
