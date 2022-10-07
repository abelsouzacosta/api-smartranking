import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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
  description?: string;

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
  events?: Event[];
}
