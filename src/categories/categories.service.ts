import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.schema';
import { Model } from 'mongoose';
import { Player } from 'src/players/entities/player.schema';
import { PlayerId } from './dto/player-id.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private async findCategoryOrThrowsNotFoundException(
    id: string,
  ): Promise<Category> {
    const foundCategory = await this.categoryModel.findById(id);

    if (!foundCategory)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return foundCategory;
  }

  private async validatePlayers({ players }: PlayerId) {
    for (const player of players) {
      const playerExists = await this.playerModel.findById(player._id);

      if (!playerExists)
        throw new HttpException(
          `Player #${player._id} was not found`,
          HttpStatus.NOT_FOUND,
        );
    }
  }

  private async checkIfPlayersAreAlreadyRegisteredForCategory(
    category_id: string,
    { players }: PlayerId,
  ) {
    const playerAlredySettedToCategory = await this.categoryModel
      .findById(category_id)
      .where('players')
      .in(players);

    if (playerAlredySettedToCategory)
      throw new HttpException(
        `Some player are already setted to the category given`,
        HttpStatus.CONFLICT,
      );
  }

  private async checkIfPlayerIsNotSettedToCategory(
    category_id: string,
    player_id: string,
  ) {
    const category = await this.categoryModel.findById(category_id);

    const playerIsSettedToCategory = category.players.includes(player_id);

    if (!playerIsSettedToCategory)
      throw new HttpException(
        `The player #${player_id} is not setted to category #${category_id}`,
        HttpStatus.FAILED_DEPENDENCY,
      );
  }

  async create({ category, description, events }: CreateCategoryDto) {
    const categoryAlreadyTaken = await this.categoryModel.findOne({
      category,
    });

    if (categoryAlreadyTaken)
      throw new HttpException('Category already taken', HttpStatus.CONFLICT);

    await this.categoryModel.create({ category, description, events });
  }

  async findAll() {
    const categories = await this.categoryModel.find();

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).populate('players');

    return category;
  }

  async addPlayersToCategory(category_id: string, body: PlayerId) {
    const { players } = body;

    await this.findCategoryOrThrowsNotFoundException(category_id);

    await this.validatePlayers(body);
    await this.checkIfPlayersAreAlreadyRegisteredForCategory(category_id, body);

    await this.categoryModel.updateOne(
      { _id: category_id },
      {
        $push: { players: players },
      },
    );
  }

  async removePlayersFromCategory(category_id: string, body: PlayerId) {
    const { players } = body;

    const category = await this.findCategoryOrThrowsNotFoundException(
      category_id,
    );

    await this.validatePlayers(body);

    for (const player of players) {
      const indexOfPlayer = category.players.indexOf(player._id);

      await this.checkIfPlayerIsNotSettedToCategory(category_id, player._id);

      category.players.splice(indexOfPlayer, 1);

      const newCategoryPlayersArray = category.players;

      await this.categoryModel.updateOne(
        { _id: category },
        { $set: { players: newCategoryPlayersArray } },
      );
    }
  }

  async update(
    id: string,
    { category, description, events }: UpdateCategoryDto,
  ) {
    await this.findCategoryOrThrowsNotFoundException(id);

    await this.categoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: { category, description, events },
      },
    );
  }

  async remove(id: string) {
    await this.findCategoryOrThrowsNotFoundException(id);

    Logger.log(`Deleting category with id #${id}`);

    await this.categoryModel.deleteOne({ _id: id });
  }
}
