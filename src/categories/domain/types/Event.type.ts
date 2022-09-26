import { OperationEnum } from '../enums/operations.enum';

export type Event = {
  name: string;
  operation: OperationEnum.PLUS | OperationEnum.MINUS;
  value: number;
};
