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

  async create(data: CreatePlayerDto) {
    await this.thorwsExceptionIfEmailAlreadyTaken(data.email);

    return this.repository.create(data);
  }

  findAll() {
    return this.repository.list();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdatePlayerDto) {
    await this.thorwsExceptionIfEmailAlreadyTaken(data.email);

    return this.repository.update(id, data);
  }
}
