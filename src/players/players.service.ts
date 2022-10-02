import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './domain/dto/create-player.dto';
import { UpdatePlayerDto } from './domain/dto/update-player.dto';
import { PlayersRepository } from './domain/repositories/players.repository';

@Injectable()
export class PlayersService {
  constructor(private readonly repository: PlayersRepository) {}

  async thorwsExceptionIfEmailAlreadyTaken(email: string): Promise<void> {
    const emailFound = await this.repository.findByEmail(email);

    if (emailFound)
      throw new HttpException(`Email Already Taken`, HttpStatus.CONFLICT);
  }

  async thorwsExceptionIfPlayerNotFound(id: string): Promise<void> {
    const player = await this.findOne(id);

    if (!player)
      throw new HttpException(`PLayer #${id} not found`, HttpStatus.NOT_FOUND);
  }

  async create(data: CreatePlayerDto) {
    await this.thorwsExceptionIfEmailAlreadyTaken(data.email);

    return this.repository.create(data);
  }

  findAll() {
    return this.repository.list();
  }

  async findPlayers(players_ids: string[]) {
    return this.repository.findPlayers(players_ids);
  }

  async findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdatePlayerDto) {
    await this.thorwsExceptionIfEmailAlreadyTaken(data.email);

    return this.repository.update(id, data);
  }
}
