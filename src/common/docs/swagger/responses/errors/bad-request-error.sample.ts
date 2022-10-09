import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { ErrorResponseSample } from './error-response.sample';

export class BadRequestErrorSample extends ErrorResponseSample {
  @ApiResponseProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  status: number;
}
