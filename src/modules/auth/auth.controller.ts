import { Router } from 'express';
import { AuthService } from './auth.service';
import { login, logout, register, status } from './routes';
import { IAuthService } from './interfaces';
import { CreateUserDto } from './validators/CreateUser.dto';
import dtoValidationMiddleware from '../../middlewares/dto.middleware';

export class AuthController {
  public authController: Router;
  public _authService: IAuthService;

  constructor(private authService: IAuthService) {
    this.authController = Router();
    this._authService = authService;
    this.routes();
  }

  public routes() {
    // POST
    this.postApis();
    // GET
    this.getApis();
  }

  private getApis(): void {
    this.authController.get('/', login);
    this.authController.get('/', status);
  }

  private postApis(): void {
    this.authController.post('/register', dtoValidationMiddleware(CreateUserDto), register);
    this.authController.post('/', logout);
  }
}

export const { authController } = new AuthController(new AuthService());
