import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'name of player',
    example: 'Antonio Marcos De Medeiros',
    required: true,
  })
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @ApiProperty({
    description: 'email of player',
    example: 'antonio.medeiros@gmail.com',
    required: true,
  })
  @IsString({
    message: 'email should be a string',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  email: string;

  @ApiProperty({
    description: `player1s phone number`,
    example: '+5575992186622',
    required: true,
  })
  @IsString({
    message: 'phone_number should be a string',
  })
  @IsNotEmpty({
    message: 'phone_number should be provided',
  })
  phone_number: string;
}
