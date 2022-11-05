import { CreateUserDetails } from '../types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails): void;
}