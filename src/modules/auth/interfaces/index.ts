import { EMAIL, FIRSTNAME, LASTNAME, PASSWORD } from '../types';
import { isEmail } from 'class-validator';

export interface IAuth {
  login(): void
};

export interface IAuthService {
  validateUser(): void;
}

export interface ICreateUser {
  email: EMAIL;
  firstName: FIRSTNAME;
  lastName: LASTNAME;
  password: PASSWORD;
}