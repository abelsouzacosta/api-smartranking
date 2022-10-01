import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './domain/dto/create-challenge.dto';
import { UpdateChallengeDto } from './domain/dto/update-challenge.dto';
import { ChallengeStatusEnum } from './domain/enums/challenge-status.enum';
import { ChallengesRepository } from './domain/repository/challenges.repository';

@Injectable()
export class ChallengesService {
  constructor(
    private readonly repository: ChallengesRepository,
    private readonly playersService: PlayersService,
  ) {}

  async throwsExceptionIfChallengeIsAlreadyMarkedAsDone(id: string) {
    const { status } = await this.repository.getStatusOfChallenge(id);

    if (status === ChallengeStatusEnum.DONE)
      throw new HttpException(
        `Challenge status #${id} is already setted as done`,
        HttpStatus.CONFLICT,
      );
  }

  create(data: CreateChallengeDto) {
    return this.repository.create(data);
  }

  findAll(data: PaginationDto) {
    return this.repository.list(data);
  }

  async findByRequester(id: string) {
    await this.playersService.thorwsExceptionIfPlayerNotFound(id);

    return this.repository.findByRequester(id);
  }

  async findByPlayer(id: string) {
    await this.playersService.thorwsExceptionIfPlayerNotFound(id);

    return this.repository.findByPlayer(id);
  }

  async acceptChallenge(id: string) {
    await this.throwsExceptionIfChallengeIsAlreadyMarkedAsDone(id);

    return this.repository.acceptChallenge(id);
  }

  cancelChallenge(id: string) {
    return this.repository.cancelChallenge(id);
  }

  completeChallenge(id: string) {
    return this.repository.completeChallenge(id);
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
