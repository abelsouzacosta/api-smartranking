import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DateHourTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const [date, hour] = value.date.split(' ');

    console.log(value);

    value.date = date;
    value.hour = hour;

    return value;
  }
}
