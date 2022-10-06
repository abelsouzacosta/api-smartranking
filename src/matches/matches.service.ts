import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './domain/dto/create-match.dto';
import { UpdateMatchDto } from './domain/dto/update-match.dto';
import { MatchesRepository } from './domain/repositories/matches.repository';

@Injectable()
export class MatchesService {
  constructor(private readonly repository: MatchesRepository) {}

  create(data: CreateMatchDto) {
    return this.repository.create(data);
  }

  findAll() {
    return `This action returns all matches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
