import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RABBITMQ_URL } from '../../common/config';
import { Queues } from 'common/constants/queues';
import { MessagePatterns } from 'common/constants/message-patterns';

@Controller('categories')
export class CategoriesController {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: Queues.ADMIN_BACKEND,
      },
    });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateCategoryDto) {
    return this.client.emit(MessagePatterns.CREATE_CATEGORY, data);
  }
}
