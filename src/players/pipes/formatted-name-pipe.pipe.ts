import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FormattedNamePipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const arrayOfNames: string[] = [];

    const { name } = value;

    const names = name.split(' ');

    for (const element of names) {
      const formattedElement =
        element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();

      arrayOfNames.push(formattedElement);
    }

    value.name = arrayOfNames.join(' ');

    return value;
  }
}
