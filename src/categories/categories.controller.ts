import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryCreatedResponseSample } from 'src/common/docs/swagger/responses/categories/category-created-response.sample';
import { ListCategoryResponseDto } from 'src/common/docs/swagger/responses/categories/list-category-response.sample';
import { ConflictErrorSample } from 'src/common/docs/swagger/responses/errors/conflict-error.sample';
import { NotFoundErrorSample } from 'src/common/docs/swagger/responses/errors/not-found-error.sample';
import { UpdatedInstanceSample } from 'src/common/docs/swagger/responses/updated-instance.sample';
import { CategoriesService } from './categories.service';
import { AddPlayerToCategoryDto } from './domain/dto/add-player-to-category.dto';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';
import { CheckEventPipe } from './pipes/check-event.pipe';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @ApiOperation({ summary: 'Creates a new Category Entity' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CategoryCreatedResponseSample,
    description: 'Category was sucessfully created',
  })
  @ApiConflictResponse({
    description:
      'returns an conflict error if category property was already taken',
    status: HttpStatus.CONFLICT,
    type: ConflictErrorSample,
  })
  @Post()
  @UsePipes(new ValidationPipe(), new CheckEventPipe())
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'List all categories in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListCategoryResponseDto,
    isArray: true,
    description: 'returns a list of all categories in the database',
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Gets an specific category in the database' })
  @ApiResponse({
    description: 'returns a instance with the id given',
    type: ListCategoryResponseDto,
    isArray: false,
    status: HttpStatus.OK,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates a category with the given id' })
  @ApiNotFoundResponse({
    description: 'returns an error',
    type: NotFoundErrorSample,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'returned if the instance was updated sucessfully',
    type: UpdatedInstanceSample,
    status: HttpStatus.OK,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiResponse({
    description:
      'adds a player identified with id in the body to the category identified in the id',
    status: HttpStatus.OK,
    type: UpdatedInstanceSample,
  })
  @ApiNotFoundResponse({
    description: 'returns an error if the player or the category was not found',
    status: HttpStatus.OK,
    type: NotFoundErrorSample,
  })
  @Patch(':id/add_player')
  addPLayerToCategory(
    @Param('id') id: string,
    @Body() data: AddPlayerToCategoryDto,
  ) {
    return this.categoriesService.addPlayerToCategory(id, data);
  }
}
