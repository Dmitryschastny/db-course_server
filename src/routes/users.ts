import { Route, CreateRoutes } from '.';
import {
  create,
  getAll,
  getById,
  auth,
  me,
  update,
  getBalance,
} from '../entities/Users/controllers';

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
  {
    path: '/me',
    method: 'post',
    action: me,
    protected: true,
  },
  {
    path: '/balance',
    method: 'get',
    action: getBalance,
    protected: true,
  },
];
