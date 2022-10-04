import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Category } from '../../entities/category.entity';
import { AddPlayerToCategoryDto } from '../dto/add-player-to-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { OperationEnum } from '../enums/operations.enum';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesRepository', () => {
  let categoryModel: Model<Category>;
  let categoriesRepository: CategoriesRepository;
  const updateSuccessfulResult = {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Category.name),
          useValue: Model,
        },
        CategoriesRepository,
      ],
    }).compile();

    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
    categoriesRepository =
      module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(categoriesRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories in the database', async () => {
      const categoriesList: any[] = [
        {
          _id: '1111111111',
          category: 'b',
          description: 'description',
          events: [
            {
              name: 'Test Event 1',
              operation: 'baba',
              value: 20,
              _id: '6331ecc8176f53e39e605188',
            },
            {
              name: 'Test Event 2',
              operation: '+',
              value: 40,
              _id: '6331ecc8176f53e39e605189',
            },
            {
              name: 'Test event 3',
              operation: '+',
              value: 90,
              _id: '6331ecc8176f53e39e60518a',
            },
          ],
          players: [
            {
              _id: '63313b2da0fcbb9829f53841',
              name: 'Abel SOuza Costa Junior',
            },
          ],
          createdAt: '2022-09-26T18:17:44.406Z',
          updatedAt: '2022-09-27T14:31:40.531Z',
          __v: 0,
        },
      ];

      jest
        .spyOn(categoriesRepository, 'findAll')
        .mockResolvedValue(categoriesList);

      expect(await categoriesRepository.findAll()).toEqual(categoriesList);
    });
  });

  describe('create', () => {
    it('should create an instace of category in the database', async () => {
      const createCategoryDto: CreateCategoryDto = {
        category: 'a',
        description: 'description',
        events: [
          {
            name: 'event',
            operation: OperationEnum.MINUS,
            value: 10,
          },
        ],
      };

      const createdCategory = {
        category: 'C',
        description:
          'This are the second best category that an player can achieve',
        events: [
          {
            name: 'Test Event 1',
            operation: OperationEnum.MINUS,
            value: 20,
            _id: '633bbf34d365a6a579507451',
          },
          {
            name: 'Test Event 2',
            operation: OperationEnum.MINUS,
            value: 40,
            _id: '633bbf34d365a6a579507452',
          },
          {
            name: 'Test event 3',
            operation: OperationEnum.MINUS,
            value: 90,
            _id: '633bbf34d365a6a579507453',
          },
        ],
        players: [],
        _id: '633bbf34d365a6a579507450',
        createdAt: '2022-10-04T05:05:56.989Z',
        updatedAt: '2022-10-04T05:05:56.989Z',
        __v: 0,
      };

      jest
        .spyOn(categoriesRepository, 'create')
        .mockResolvedValue(createdCategory);

      expect(await categoriesRepository.create(createCategoryDto)).toEqual(
        createdCategory,
      );
    });
  });

  describe('findById', () => {
    it('must return an instance whose id exists in the database', async () => {
      const id = '11111';

      const findByIdResult = {
        _id: '11111',
        category: 'C',
        description:
          'This are the second best category that an player can achieve',
        events: [
          {
            name: 'Test Event 1',
            operation: OperationEnum.MINUS,
            value: 20,
            _id: '633bbf34d365a6a579507451',
          },
          {
            name: 'Test Event 2',
            operation: OperationEnum.MINUS,
            value: 40,
            _id: '633bbf34d365a6a579507452',
          },
          {
            name: 'Test event 3',
            operation: OperationEnum.MINUS,
            value: 90,
            _id: '633bbf34d365a6a579507453',
          },
        ],
        players: [],
        createdAt: '2022-10-04T05:05:56.989Z',
        updatedAt: '2022-10-04T05:05:56.989Z',
        __v: 0,
      };

      jest
        .spyOn(categoriesRepository, 'findById')
        .mockResolvedValue(findByIdResult);
      jest.spyOn(categoryModel, 'findById').mockResolvedValue(findByIdResult);

      const result = await categoriesRepository.findById(id);

      expect(result).toEqual(findByIdResult);
    });
  });

  describe('findByCategory', () => {
    it('must return a instance whose category is equal to category attribute given', async () => {
      const category = 'C';

      const findByCategoryResult = {
        _id: '11111',
        category: 'C',
        description:
          'This are the second best category that an player can achieve',
        events: [
          {
            name: 'Test Event 1',
            operation: OperationEnum.MINUS,
            value: 20,
            _id: '633bbf34d365a6a579507451',
          },
          {
            name: 'Test Event 2',
            operation: OperationEnum.MINUS,
            value: 40,
            _id: '633bbf34d365a6a579507452',
          },
          {
            name: 'Test event 3',
            operation: OperationEnum.MINUS,
            value: 90,
            _id: '633bbf34d365a6a579507453',
          },
        ],
        players: [],
        createdAt: '2022-10-04T05:05:56.989Z',
        updatedAt: '2022-10-04T05:05:56.989Z',
        __v: 0,
      };

      const repositorySpy = jest
        .spyOn(categoriesRepository, 'findByCategory')
        .mockResolvedValue(findByCategoryResult);

      const result = await categoriesRepository.findByCategory(category);

      expect(result).toEqual(findByCategoryResult);
      expect(result.category).toBe(category);
      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an category with the given id', async () => {
      const id = '1';
      const updateCategoryDto: UpdateCategoryDto = {
        description: 'testing update',
      };

      jest
        .spyOn(categoriesRepository, 'update')
        .mockResolvedValue(updateSuccessfulResult);

      const result = await categoriesRepository.update(id, updateCategoryDto);

      expect(result).toEqual(updateSuccessfulResult);
    });
  });

  describe('addPlayerToCategory', () => {
    it('should update an category adding player to them', async () => {
      const id = '1';
      const addPlayerToCategoryDto: AddPlayerToCategoryDto = {
        player_id: '63313b2da0fcbb9829f53841',
      };

      jest
        .spyOn(categoriesRepository, 'addPlayerToCategory')
        .mockResolvedValue(updateSuccessfulResult);

      const result = await categoriesRepository.addPlayerToCategory(
        id,
        addPlayerToCategoryDto,
      );

      expect(result).toEqual(updateSuccessfulResult);
    });
  });
});
