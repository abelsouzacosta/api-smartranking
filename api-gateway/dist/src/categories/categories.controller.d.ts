import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly client;
    constructor();
    create(data: CreateCategoryDto): import("rxjs").Observable<any>;
}
