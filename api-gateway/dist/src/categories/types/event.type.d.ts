import { Operations } from '../enums/operations.enum';
export declare type Event = {
    name: string;
    operation: Operations.MINUS | Operations.PLUS;
    value: string;
};
