import { IUserService } from './interfaces';
import { provide } from 'inversify-binding-decorators';
import { CreateUserDetails, USER_TYPES } from './types';

@provide(USER_TYPES.UserService)
export class UserService implements IUserService {
  createUser(userDetails: CreateUserDetails): void {
    console.log('UserService.createUser');
  }

}