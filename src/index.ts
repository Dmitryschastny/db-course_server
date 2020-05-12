// import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Request, Response, RequestHandler } from 'express';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRoutes } from './routes';
import { validateToken } from './utils/middlewares';
import { createInitialData } from './createInitialData';

const start = async () => {
  await createConnection();

  try {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    AppRoutes.forEach(route => {
      const registerRoute = async (
        request: Request,
        response: Response,
        next: Function
      ) => {
        try {
          await route.action(request, response);
          next();
        } catch (error) {
          next(error);
        }
      };

      const middlewares: RequestHandler[] = [];

      if (route.protected) {
        middlewares.push(validateToken);
      }

      middlewares.push(registerRoute);

      app[route.method](route.path, ...middlewares);
    });

    app.listen(3000);
    createInitialData();

    console.log('Express application is up and running on port 3000');
  } catch (error) {
    console.log('TypeORM connection error: ', error);
  }
};

start();
