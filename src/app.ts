import 'reflect-metadata';
import express, { Application } from 'express';
import { config } from 'dotenv';
import { Container } from 'inversify';
import cors from 'cors';

// MIDDLEWARE
import { UnknownRoutesInterceptor } from './middlewares/unknownRoutes.interceptor';
import { ErrorsInterceptor } from './middlewares/errors.interceptor';

import { InversifyExpressServer } from 'inversify-express-utils';

import './ioc';
import { buildProviderModule } from 'inversify-binding-decorators';

config();

export class App {
  protected _container: Container | undefined;
  protected _port: string;

  constructor(port: string) {
    this._port = port;
  }

  get container(): Container {
    if (! this._container) {
      this._container = new Container();
      this._container.load(buildProviderModule());
    }
    return this._container;
  }

  init(): void {
    this.startServer(this._port)
  }

  /**
   * Listen for requests on the port defined in the config
   */
  protected startServer(port: string): void {

    const server: InversifyExpressServer = new InversifyExpressServer(this.container);

    server.setConfig((app: Application) => {

      // We tell Express that we want to authorize all domain names to make requests on our API.
      app.use(cors());

      // Parse body request to JSON
      // @example app.post('/', (req) => req.body.prop)
      app.use(express.json());
    });

    server.setErrorConfig((app: Application) => {
      // Intercept and return error 404 for unknown routes
      app.use('*', UnknownRoutesInterceptor);

      // Attach error handling middleware functions after route handlers
      app.use(ErrorsInterceptor);
    });

    const serverInstance: Application = server.build();

    serverInstance.listen(port, async () => {
      console.log(`Server is listening on port ${port}`);
      // await dbConnection();
    });
  }
}

function bootstrap() {
  try {
    /**
     * Check NODE ENV
     */
    const API_PORT: string = process.env.NODE_ENV === 'test' ? '3001' : process.env.API_PORT || '3000';

    const app: App = new App(API_PORT);

    app.init();
  } catch (e) {
    console.error(e);
  }
}

bootstrap();