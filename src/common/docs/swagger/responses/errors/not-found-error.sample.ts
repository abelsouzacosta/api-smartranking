import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ErrorResponseSample } from './error-response.sample';

export class NotFoundErrorSample extends ErrorResponseSample {
  @ApiResponseProperty({
    example: HttpStatus.NOT_FOUND,
  })
  status: number;
}
