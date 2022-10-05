import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from 'src/matches/entities/match.entity';

export class MatchesRepository {
  constructor(
    @InjectModel(Match.name)
    private readonly model: Model<Match>,
  ) {}
}
