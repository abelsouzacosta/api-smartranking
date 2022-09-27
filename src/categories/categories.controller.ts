import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddPlayerToCategoryDto } from './domain/dto/add-player-to-category.dto';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CheckEventPipe } from './pipes/check-event.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new ValidationPipe(), new CheckEventPipe())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Patch(':id/add_player')
  addPLayerToCategory(
    @Param('id') id: string,
    @Body() data: AddPlayerToCategoryDto,
  ) {
    return this.categoriesService.addPlayerToCategory(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
