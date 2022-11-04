import express, { Application } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { UnknownRoutesInterceptor } from './middlewares/unknownRoutes.interceptor';
import { ErrorsInterceptor } from './middlewares/errors.interceptor';
import { authController } from './modules/auth/auth.controller';

config();

export class App {
  public app;
  protected _port: string;

  constructor(port: string) {
    // Create a new express app
    this.app = express();

    this._port = port;
  }

  init(): void {
    this.enableCors();
    this.parseBody();
    this.routes();
    this.errorsMiddleware();
    this.startServer(this._port)
  }

  /**
   *
   * We tell Express that we want to authorize all domain names to make requests on our API.
   */
  protected enableCors(): void {
    this.app.use(cors());
  }

  /**
   * Parse body request to JSON
   *
   * @example app.post('/', (req) => req.body.prop)
   */
  protected parseBody(): void {
    this.app.use(express.json());
  }

  protected errorsMiddleware(): void {
    /**
     * Intercept and return error 404 for unknown routes
     */
    this.app.use('*', UnknownRoutesInterceptor);

    /**
     * Attach error handling middleware functions after route handlers
     */
    this.app.use(ErrorsInterceptor);
  }

  protected routes(): void {
    // console.log("yes => " , authController);
    this.app.use('/auth', authController)
  }

  /**
   * Listen for requests on the port defined in the config
   */
  protected startServer(port: string): void {
    // TODO: add control
    this.app.listen(port, async () => {
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