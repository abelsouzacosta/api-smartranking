import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Result } from '../types/Result.type';

export class CreateMatchDto {
  @ApiProperty({
    description: 'category of the match',
    example: '6331ecc8176f53e39e605187',
    required: true,
  })
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category should be a string',
  })
  category: string;

  @ApiProperty({
    description: 'players in the match',
    example: ['63313b2da0fcbb9829f53841', '63314005404e91aa8d896f25'],
    required: true,
  })
  @IsArray({
    message: 'players should be an array',
  })
  @ArrayNotEmpty({
    message: 'player should not be empty',
  })
  players: string[];

  @ApiProperty({
    description: 'defensor of the match',
    example: '63313b2da0fcbb9829f53841',
    required: true,
  })
  @IsString({
    message: 'def should be a string',
  })
  @IsNotEmpty({
    message: 'def should not be empty',
  })
  def: string;

  @ApiProperty({
    description: 'result of the match',
    example: [
      {
        set: '5-6',
      },
      {
        set: '5-6',
      },
    ],
    required: true,
  })
  @IsArray({
    message: 'result should be an array',
  })
  @ArrayNotEmpty({
    message: 'result should not be an empty array',
  })
  @ArrayMinSize(1, {
    message: 'resultr should have at least one member',
  })
  result: Result[];
}
