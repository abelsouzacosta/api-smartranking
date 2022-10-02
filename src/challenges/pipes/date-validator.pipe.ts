import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValid, isPast } from 'date-fns';

@Injectable()
export class DateValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const date = new Date(value.date);

    const validDate = isValid(date);

    if (!validDate)
      throw new HttpException(
        `An invalid date was given, please set a valid input`,
        HttpStatus.BAD_REQUEST,
      );

    const pastDate = isPast(date);

    if (pastDate)
      throw new HttpException(
        `The date given is in the past, please set a valid date in the future`,
        HttpStatus.BAD_REQUEST,
      );

    return value;
  }
}
