import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CategoriesRepository } from './domain/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  private async throwsExceptionIfCategoryIsAlreadyTaken(
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

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
