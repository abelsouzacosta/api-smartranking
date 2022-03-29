import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PlayerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value)
      throw new BadRequestException(
        `The argument ${metadata.data} must be provovided`,
      );
  }
}
