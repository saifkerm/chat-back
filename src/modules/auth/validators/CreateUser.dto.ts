import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { EMAIL, FIRSTNAME, LASTNAME, PASSWORD } from '../types';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: EMAIL | undefined;

  @IsNotEmpty()
  @MaxLength(32)
  firstName: FIRSTNAME | undefined;

  @IsNotEmpty()
  @MaxLength(32)
  lastName: LASTNAME | undefined;

  @IsNotEmpty()
  @MaxLength(32)
  password: PASSWORD | undefined;
}