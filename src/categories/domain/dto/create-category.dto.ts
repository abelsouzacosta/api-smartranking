import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Event } from '../types/Event.type';

export class CreateCategoryDto {
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category should not be empty',
  })
  category: string;

  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description should not be empty',
  })
  description: string;

  @IsArray({
    message: 'events should be an array',
  })
  @IsOptional()
  events: Event[];
}
