import { Injectable } from '@nestjs/common';
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

  async create({ category, description, events, players }: CreateCategoryDto) {
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

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
