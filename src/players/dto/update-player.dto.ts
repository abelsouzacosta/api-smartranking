import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsEmail()
  email?: string;

  @IsPhoneNumber()
  phone_number?: string;
}
