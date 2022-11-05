import { IAuthService } from './interfaces';
import { provide } from 'inversify-binding-decorators';
import { AUTH_TYPES } from './types';

@provide(AUTH_TYPES.AuthService)
export class AuthService implements IAuthService {

  validateUser(): void {
    console.log('validate');
  }
}