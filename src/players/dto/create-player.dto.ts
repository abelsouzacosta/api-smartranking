import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone_number: string;
}
