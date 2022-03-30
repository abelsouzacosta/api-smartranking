import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  private async findCategoryOrThrowsException(id: string): Promise<void> {
    const foundCategory = await this.categoryModel.findById(id);

    if (!foundCategory)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async create({ category, description, events, players }: CreateCategoryDto) {
    const categoryAlreadyTaken = await this.categoryModel.findOne({
      category,
    });

    if (categoryAlreadyTaken)
      throw new HttpException('Category already taken', HttpStatus.CONFLICT);

    await this.categoryModel.create({ category, description, events, players });
  }

  async findAll() {
    const categories = await this.categoryModel.find();

    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).populate('players');

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findCategoryOrThrowsException(id);
  }

  async remove(id: string) {
    await this.findCategoryOrThrowsException(id);
  }
}
