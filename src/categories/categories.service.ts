import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { AddPlayerToCategoryDto } from './domain/dto/add-player-to-category.dto';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CategoriesRepository } from './domain/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly repository: CategoriesRepository,
    private readonly playersService: PlayersService,
  ) {}

  public async throwsExceptionIfCategoryIsAlreadyTaken(
    category: string,
  ): Promise<void> {
    const categoryFound = await this.repository.findByCategory(category);

    if (categoryFound)
      throw new HttpException(
        `Category ${category} Already Exists`,
        HttpStatus.CONFLICT,
      );
  }

  private async throwsExceptionIfCategoryNotFound(id: string): Promise<void> {
    const category = await this.repository.findById(id);

    if (!category)
      throw new HttpException(
        `Category #${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }

  async throwsExceptionIfPlayerDontBelongToCategory(
    id: string,
    players_ids: string[],
  ): Promise<void> {
    const { players } = await this.repository.findById(id);

    const category_players_ids: string[] = [];
    const array_players_ids: string[] = [];

    for (const id of players) {
      category_players_ids.push(id.toString());
    }

    for (const id of players_ids) {
      array_players_ids.push(id.toString());
    }

    for (const player_id of array_players_ids) {
      if (!category_players_ids.includes(player_id))
        throw new HttpException(
          `Player #${player_id} doesnt belong to category`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  async create(data: CreateCategoryDto) {
    await this.throwsExceptionIfCategoryIsAlreadyTaken(data.category);

    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: UpdateCategoryDto) {
    await this.throwsExceptionIfCategoryNotFound(id);

    return this.repository.update(id, data);
  }

  async addPlayerToCategory(id: string, data: AddPlayerToCategoryDto) {
    await this.throwsExceptionIfCategoryNotFound(id);

    await this.playersService.thorwsExceptionIfPlayerNotFound(data.player_id);

    return this.repository.addPlayerToCategory(id, data);
  }
}
