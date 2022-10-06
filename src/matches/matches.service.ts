import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './domain/dto/create-match.dto';
import { MatchesRepository } from './domain/repositories/matches.repository';

@Injectable()
export class MatchesService {
  constructor(private readonly repository: MatchesRepository) {}

  create(data: CreateMatchDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.list();
  }
}
