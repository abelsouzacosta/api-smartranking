import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { UpdateChallengeDto } from './domain/dto/update-challenge.dto';
import { ChallengesRepository } from './domain/repository/challenges.repository';

@Injectable()
export class ChallengesService {
  constructor(private readonly repository: ChallengesRepository) {}

  create(data: CreateChallengeDto) {
    return this.repository.create(data);
  }

  findAll(data: PaginationDto) {
    return this.repository.list(data);
  }

  findByRequester(id: string) {
    return this.repository.findByRequester(id);
  }

  findByPlayer(id: string) {
    return this.repository.findByPlayer(id);
  }

  acceptChallenge(id: string) {
    return this.repository.acceptChallenge(id);
  }

  cancelChallenge(id: string) {
    return this.repository.cancelChallenge(id);
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
