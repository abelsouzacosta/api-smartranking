import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { ChallengesRepository } from './domain/repository/challenges.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './entities/challenge.entity';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository],
})
export class ChallengesModule {}
