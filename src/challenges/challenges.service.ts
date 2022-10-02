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

  async getStatusOfChallenge(id: string) {
    const { status } = await this.repository.getStatusOfChallenge(id);

    return status;
  }

  async throwsExceptionIfChallengeIsMarkedAsDone(id: string) {
    const { status } = await this.repository.getStatusOfChallenge(id);

    if (status === ChallengeStatusEnum.DONE)
      throw new HttpException(
        `Challenge status #${id} is already setted as done`,
        HttpStatus.CONFLICT,
      );
  }

  async throwsExceptionIfChallengeIsMarkedAsCanceled(id: string) {
    const status = await this.getStatusOfChallenge(id);

    if (status === ChallengeStatusEnum.CANCELED)
      throw new HttpException(
        `Challenge #${id} is marked as canceled`,
        HttpStatus.CONFLICT,
      );
  }

  async thorwsExceptionIfChallengeIsMarkedAsDenied(id: string) {
    const status = await this.getStatusOfChallenge(id);

    if (status === ChallengeStatusEnum.DENIED)
      throw new HttpException(
        `Challenge #${id} is marked as denied`,
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
    await this.throwsExceptionIfChallengeIsMarkedAsCanceled(id);

    await this.throwsExceptionIfChallengeIsMarkedAsDone(id);

    await this.thorwsExceptionIfChallengeIsMarkedAsDenied(id);

    return this.repository.acceptChallenge(id);
  }

  async cancelChallenge(id: string) {
    await this.throwsExceptionIfChallengeIsMarkedAsCanceled(id);

    await this.throwsExceptionIfChallengeIsMarkedAsDone(id);

    await this.thorwsExceptionIfChallengeIsMarkedAsDenied(id);

    return this.repository.cancelChallenge(id);
  }

  async completeChallenge(id: string) {
    await this.throwsExceptionIfChallengeIsMarkedAsCanceled(id);

    await this.throwsExceptionIfChallengeIsMarkedAsDone(id);

    await this.thorwsExceptionIfChallengeIsMarkedAsDenied(id);

    return this.repository.completeChallenge(id);
  }

  async denyChallenge(id: string) {
    await this.throwsExceptionIfChallengeIsMarkedAsCanceled(id);

    await this.throwsExceptionIfChallengeIsMarkedAsDone(id);

    await this.thorwsExceptionIfChallengeIsMarkedAsDenied(id);

    return this.repository.denyChallenge(id);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  update(id: number, data: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
