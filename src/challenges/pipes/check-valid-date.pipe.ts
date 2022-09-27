import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValid } from 'date-fns';

@Injectable()
export class CheckValidDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const validDate = isValid(value.date);

    if (!validDate)
      throw new HttpException(`Invalid Date`, HttpStatus.BAD_REQUEST);

    return value;
  }
}
