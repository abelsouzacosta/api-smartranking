import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class SetSolicitationInfoPipe implements PipeTransform {
  // eslint-disable-next-line
  transform(value: any, metadata: ArgumentMetadata) {
    const localeTime = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    const [date, hour] = localeTime.split(' ');
    const [day, month, year] = date.split('/').map(Number);

    const now = new Date(year, month - 1, day);

    const solicitation_date = format(now, 'yyyy-MM-dd');

    value.solicitation_date = solicitation_date;
    value.solicitation_hour = hour;

    console.log(value);

    return value;
  }
}
