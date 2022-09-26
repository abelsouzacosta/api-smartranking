import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CategoriesRepository } from './domain/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  create(data: CreateCategoryDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, data: UpdateCategoryDto) {
    return this.repository.update(id, data);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
