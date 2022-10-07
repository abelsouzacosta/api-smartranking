import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({
    example: 'Antonio Marcos De Medeiros',
  })
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should be provided',
  })
  name: string;

  @ApiProperty({
    example: 'antonio.medeiros@gmail.com',
  })
  @IsString({
    message: 'email should be a string',
  })
  @IsNotEmpty({
    message: 'email should be provided',
  })
  email: string;

  @ApiProperty({
    example: '+5575992186622',
  })
  @IsString({
    message: 'phone_number should be a string',
  })
  @IsNotEmpty({
    message: 'phone_number should be provided',
  })
  phone_number: string;
}
