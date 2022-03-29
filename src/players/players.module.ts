import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
