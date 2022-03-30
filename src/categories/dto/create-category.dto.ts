import { Event } from '../entities/category.schema';
import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

type RequestPlayer = {
  _id: string;
};

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

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  players: RequestPlayer[];
}
