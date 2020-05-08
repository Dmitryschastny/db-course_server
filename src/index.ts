// import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Request, Response, RequestHandler } from 'express';
import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRoutes } from './routes';
import { validateToken } from './utils/middlewares';

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

const start = async () => {
  await createConnection();

  try {
    // create express app
    const app = express();

    app.use(cors());

    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach((route) => {
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

    // run app
    app.listen(3000);

    console.log('Express application is up and running on port 3000');
  } catch (error) {
    console.log('TypeORM connection error: ', error);
  }
};

start();
