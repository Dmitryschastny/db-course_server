import { Route, CreateRoutes } from '.';
import { getById } from '../entities/Settings/controllers';

export const createRoutes: CreateRoutes = (base: string): Route[] => [
  {
    path: `/${base}/:id`,
    method: 'get',
    action: getById,
  },
];
