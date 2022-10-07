import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({
    description: 'name of player',
    example: 'Antonio Marcos De Medeiros',
    required: false,
  })
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name?: string;

  @ApiProperty({
    description: 'email of player',
    example: 'antonio.medeiros@gmail.com',
    required: false,
  })
  @IsString({
    message: 'email should be a string',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  email?: string;

  @ApiProperty({
    description: `player1s phone number`,
    example: '+5575992186622',
    required: false,
  })
  @IsString({
    message: 'phone_number should be a string',
  })
  @IsNotEmpty({
    message: 'phone_number should be provided',
  })
  phone_number?: string;
}
