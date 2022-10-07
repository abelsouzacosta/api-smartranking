import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorResponseSample {
  @ApiResponseProperty({
    example: 'An error message will be displayed',
  })
  message: string;

  @ApiResponseProperty({
    example: 1665113082687,
  })
  timestamps: number;
}
