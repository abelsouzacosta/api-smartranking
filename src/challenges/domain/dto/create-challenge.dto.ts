import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty({
    example: '2023-07-17 03:24:00',
    description: 'date of the challenge',
    required: true,
  })
  @IsString({
    message: 'date should be a string',
  })
  @IsNotEmpty({
    message: 'date should not be empty',
  })
  date: string;

  @ApiProperty({
    example: '63313b2da0fcbb9829f53841',
    description: 'challenge requester',
    required: true,
  })
  @IsString({
    message: 'requester should be a string',
  })
  @IsNotEmpty({
    message: 'requester should not be empty',
  })
  requester: string;

  @ApiProperty({
    example: '63313b2da0fcbb9829f53841',
    description: 'category of the challenge',
    required: true,
  })
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category sohuld not be empty',
  })
  category: string;

  @ApiProperty({
    example: ['63313b2da0fcbb9829f53841', '63313b2da0fcbb9829f53841'],
    description: 'array of players in the challenge',
    required: true,
  })
  @IsArray({
    message: 'players should be an array',
  })
  @IsString({
    each: true,
    message: 'players should be an array of strings',
  })
  @ArrayMinSize(2, {
    message: 'players should have at least 2 players',
  })
  players: string[];

  hour?: string;

  solicitation_date?: string;

  solicitation_hour?: string;
}
