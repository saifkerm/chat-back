import { NextFunction, Request, Response, Router } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { AUTH_TYPES } from './types';
import { AuthService } from './auth.service';
import { ROUTES } from '../../utils/constants';
import { UserService } from '../users/user.service';
import { CreateUserDetails, USER_TYPES } from '../users/types';
import dtoValidationMiddleware from '../../middlewares/dto.middleware';
import { CreateUserDto } from './validators/CreateUser.dto';

@controller(ROUTES.AUTHENTICATION_ROOT_PATH)
export class AuthController {

  constructor(
    @inject(AUTH_TYPES.AuthService) private authService: AuthService,
    @inject(USER_TYPES.UserService) private userService: UserService
  ) { }

  @httpPost(
    '/register',
    dtoValidationMiddleware(CreateUserDto)
  )
  public async register (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      console.log("body => ", req.body);

      const body: CreateUserDetails = req.body;
      this.userService.createUser(body);

      return res.status(200).json({ test: "register" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  @httpGet('/login')
  public async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      return res.status(200).json({ test: "login" });
    } catch (error) {
      next(error);
    }
  }

  @httpPost('/logout')
  public async logout (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      return res.status(200).json({ test: "logout" });
    } catch (error) {
      next(error);
    }
  }

  @httpGet('/status')
  public async status (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      return res.status(200).json({ test: "status" });
    } catch (error) {
      next(error);
    }
  }
}