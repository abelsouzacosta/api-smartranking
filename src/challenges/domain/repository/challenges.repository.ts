import { Challenge } from 'src/challenges/entities/challenge.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { ChallengeStatusEnum } from '../enums/challenge-status.enum';

export class ChallengesRepository {
  constructor(
    @InjectModel(Challenge.name)
    private readonly model: Model<Challenge>,
  ) {}

  async create(data: CreateChallengeDto): Promise<Challenge> {
    return this.model.create({
      ...data,
      status: ChallengeStatusEnum.PENDING,
    });
  }

  async list(): Promise<Array<Challenge>> {
    return this.model
      .find()
      .populate('requester', 'name')
      .populate('category', 'category')
      .populate('players', 'name');
  }
}
