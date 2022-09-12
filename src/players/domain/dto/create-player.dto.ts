import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @IsString({
    message: 'email should be a string',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  email: string;

  @IsString({
    message: 'phone_number should be a string',
  })
  @IsNotEmpty({
    message: 'phone_number should be provided',
  })
  phone_number: string;
}
