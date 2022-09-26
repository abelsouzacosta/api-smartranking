import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OperationEnum } from '../domain/enums/operations.enum';

@Schema()
export class EventEntity {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  operation: OperationEnum.PLUS | OperationEnum.MINUS;

  @Prop({ required: true, type: Number })
  value: number;
}

export const EventSchema = SchemaFactory.createForClass(EventEntity);
