import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { UpdateChallengeDto } from './domain/dto/update-challenge.dto';
import { ChallengesRepository } from './domain/repository/challenges.repository';

@Injectable()
export class ChallengesService {
  constructor(private readonly repository: ChallengesRepository) {}

  create(data: CreateChallengeDto) {
    return this.repository.create(data);
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, data: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
