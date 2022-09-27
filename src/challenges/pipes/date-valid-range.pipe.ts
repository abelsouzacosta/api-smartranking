import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DateValidRangePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const validRange = value.date.getTime() >= new Date().getTime();

    if (!validRange)
      throw new HttpException(`Invalid Date Range`, HttpStatus.BAD_REQUEST);

    return value;
  }
}
