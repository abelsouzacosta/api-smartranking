import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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
