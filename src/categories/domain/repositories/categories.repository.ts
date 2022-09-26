import { Category } from 'src/categories/entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';

export class CategoriesRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly model: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
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
}
