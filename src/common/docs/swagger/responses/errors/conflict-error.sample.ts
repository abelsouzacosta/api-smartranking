import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ErrorResponseSample } from './error-response.sample';

export class ConflictErrorSample extends ErrorResponseSample {
  @ApiResponseProperty({
    example: HttpStatus.CONFLICT,
  })
  status: number;
}
