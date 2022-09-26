import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OperationEnum } from '../domain/enums/operations.enum';

@Injectable()
export class CheckEventPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const { events } = value;

    for (const event of events) {
      if (
        event.operation !== OperationEnum.PLUS ||
        event.operation !== OperationEnum.MINUS
      )
        throw new HttpException(
          `Operation should be ${OperationEnum.MINUS} or ${OperationEnum.PLUS}`,
          HttpStatus.BAD_REQUEST,
        );
    }

    return value;
  }
}
