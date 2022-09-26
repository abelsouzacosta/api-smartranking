import { Category } from 'src/categories/entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { UpdateResult } from 'mongodb';

export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<Category>,
  ) {}

  async throwsExceptionIfCategoryIsAlreadyTaken(
    category: string,
  ): Promise<void> {
    const categoryFound = await this.findByCategory(category);

    if (categoryFound)
      throw new HttpException(
        `Category ${category} Already Exists`,
        HttpStatus.CONFLICT,
      );
  }

  async create(data: CreateCategoryDto): Promise<Category> {
    await this.throwsExceptionIfCategoryIsAlreadyTaken(data.category);

    return this.model.create({
      ...data,
    });
  }

  async findAll(): Promise<Array<Category>> {
    return this.model.find();
  }

  async findById(id: string): Promise<Category> {
    return this.model.findById(id);
  }

  async findByCategory(category: string): Promise<Category> {
    return this.model.findOne({
      category,
    });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<UpdateResult> {
    return this.model.updateOne({ _id: id }, { ...data });
  }
}
