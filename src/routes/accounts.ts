import { Route, CreateRoutes } from '.';
import {
  getAll,
  getById,
  create,
  update,
  deleteById,
} from '../entities/Accounts/controllers';

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
    path: `/${base}/:id`,
    method: 'put',
    action: update,
  },
  {
    path: `/${base}/:id`,
    method: 'delete',
    action: deleteById,
  },
  {
    path: `/${base}`,
    method: 'post',
    action: create,
    protected: true,
  },
];
