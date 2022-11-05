import { EMAIL, FIRSTNAME, LASTNAME, PASSWORD } from '../../utils/constants';

export type CreateUserDetails = {
  email: EMAIL;
  password: PASSWORD;
  firstName: FIRSTNAME;
  lastName: LASTNAME;
};

export const USER_TYPES = {
  UserService: Symbol.for('UserService')
};
