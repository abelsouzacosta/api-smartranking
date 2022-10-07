import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class PlayerCreatedResponseSample extends MongoInstanceSample {
  @ApiResponseProperty({
    example: 'Antonio Marcos De Medeiros',
  })
  name: string;

  @ApiResponseProperty({
    example: 'antonio.medeiros@gmail.com"',
  })
  email: string;

  @ApiResponseProperty({
    example: '+55759999999',
  })
  phone_number: string;
}
