import { Event } from '../entities/category.schema';
import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  events: Event[];
}
