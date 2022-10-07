import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Event } from '../types/Event.type';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category name (identified by a letter)',
    example: 'C',
  })
  @IsString({
    message: 'category should be a string',
  })
  @IsNotEmpty({
    message: 'category should not be empty',
  })
  category: string;

  @ApiProperty({
    description: 'category description',
    example: 'this is the C category',
  })
  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description should not be empty',
  })
  description: string;

  @ApiProperty({
    description: 'events of the category',
    example: [
      {
        name: 'Test Event 1',
        operation: '-',
        value: 20,
      },
    ],
  })
  @IsArray({
    message: 'events should be an array',
  })
  @IsOptional()
  events: Event[];
}
