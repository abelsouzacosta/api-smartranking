import { ApiResponseProperty } from '@nestjs/swagger';
import { MongoInstanceSample } from '../mongo-instance.sample';

export class CategoryCreatedResponseSample extends MongoInstanceSample {
  @ApiResponseProperty({
    example: 'C',
  })
  category: string;

  @ApiResponseProperty({
    example: 'This is the c category',
  })
  description: string;

  @ApiResponseProperty({
    example: [
      {
        name: 'Test Event 1',
        operation: '-',
        value: 20,
        _id: '633bbf34d365a6a579507451',
      },
      {
        name: 'Test Event 2',
        operation: '+',
        value: 40,
        _id: '633bbf34d365a6a579507452',
      },
      {
        name: 'Test event 3',
        operation: '+',
        value: 90,
        _id: '633bbf34d365a6a579507453',
      },
    ],
  })
  events: any[];

  @ApiResponseProperty({
    example: [],
  })
  players: any[];
}
