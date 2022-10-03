import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Result {
  @Prop({ required: true, type: String })
  set: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
