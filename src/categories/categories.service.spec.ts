import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { PlayersRepository } from '../players/domain/repositories/players.repository';
import { PlayersService } from '../players/players.service';
import { PlayersModule } from '../players/players.module';
import { Player } from '../players/entities/player.entity';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './domain/repositories/categories.repository';
import { Category } from './entities/category.entity';
import { OperationEnum } from './domain/enums/operations.enum';
import { HttpException } from '@nestjs/common';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepository: CategoriesRepository;
  const createCategoryDto = {
    category: 'C',
    description: 'This are the second best category that an player can achieve',
    events: [
      {
        name: 'Test Event 1',
        operation: OperationEnum.MINUS,
        value: 20,
      },
      {
        name: 'Test Event 2',
        operation: OperationEnum.MINUS,
        value: 40,
      },
      {
        name: 'Test event 3',
        operation: OperationEnum.MINUS,
        value: 90,
      },
    ],
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Category.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Player.name),
          useValue: Model,
        },
        CategoriesRepository,
        CategoriesService,
        PlayersModule,
        PlayersService,
        PlayersRepository,
      ],
    }).compile();

    categoriesRepository =
      module.get<CategoriesRepository>(CategoriesRepository);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  describe('findAll', () => {
    describe('Success Case', () => {
      it('should return a list of all categories in the database', async () => {
        const list: any[] = [
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

        const serviceSpy = jest
          .spyOn(categoriesService, 'findAll')
          .mockResolvedValue(list);

        const result = await categoriesService.findAll();

        expect(result).toEqual(list);
        expect(serviceSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('create', () => {
    describe('Success Case', () => {
      it('should create an instance in the database and return the created instance', async () => {
        const categoryCreated: any = {
          category: 'A',
          description:
            'This are the second best category that an player can achieve',
          events: [
            {
              name: 'Test Event 1',
              operation: '-',
              value: 20,
              _id: '633bbf34d365a6a579507451',
            },
            {
              name: 'Test Event 2',
              operation: '+',
              value: 40,
              _id: '633bbf34d365a6a579507452',
            },
            {
              name: 'Test event 3',
              operation: '+',
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
          .spyOn(categoriesService, 'create')
          .mockResolvedValue(categoryCreated);

        const result = await categoriesService.create(createCategoryDto);

        expect(result).toEqual(categoryCreated);
      });
    });

    describe('Fail Case', () => {
      it('should not create an category if the category attribute already exists in the database', async () => {
        const categoryFound: any = {
          category: 'A',
          description:
            'This are the second best category that an player can achieve',
          events: [
            {
              name: 'Test Event 1',
              operation: '-',
              value: 20,
              _id: '633bbf34d365a6a579507451',
            },
            {
              name: 'Test Event 2',
              operation: '+',
              value: 40,
              _id: '633bbf34d365a6a579507452',
            },
            {
              name: 'Test event 3',
              operation: '+',
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
          .spyOn(categoriesRepository, 'findByCategory')
          .mockResolvedValue(categoryFound);

        expect(async () =>
          categoriesService.create(createCategoryDto),
        ).rejects.toBeInstanceOf(HttpException);
      });
    });
  });
});
