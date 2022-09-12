import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './domain/dto/create-player.dto';
import { UpdatePlayerDto } from './domain/dto/update-player.dto';
import { PlayersRepository } from './domain/repositories/players.repository';

@Injectable()
export class PlayersService {
  constructor(private readonly repository: PlayersRepository) {}

  create(data: CreatePlayerDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.list();
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: string, data: UpdatePlayerDto) {
    return this.repository.update(id, data);
  }
}
