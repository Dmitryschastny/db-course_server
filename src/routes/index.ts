import { Request, Response } from 'express';
import { createRoutes } from './users';

export type Route = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  action(request: Request, response: Response): Promise<any>;
  protected?: boolean;
};

export type CreateRoutes = (base: string) => Route[];

export const AppRoutes: Route[] = [...createRoutes('users')];
