import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category should be provided',
  })
  category: string;

  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description should be provided',
  })
  description: string;

  @IsArray({
    message: 'events should be an array',
  })
  @IsOptional()
  events: Event[];
}
