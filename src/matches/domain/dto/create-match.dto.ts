import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Result } from '../types/Result.type';

export class CreateMatchDto {
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category should be a string',
  })
  category: string;

  @IsArray({
    message: 'players should be an array',
  })
  @ArrayNotEmpty({
    message: 'player should not be empty',
  })
  players: string[];

  @IsString({
    message: 'def should be a string',
  })
  @IsNotEmpty({
    message: 'def should not be empty',
  })
  def: string;

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
