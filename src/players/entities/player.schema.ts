import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true, collection: 'players' })
export class Player {
  _id: ObjectId;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public phone_number: string;

  @Prop()
  public ranking: string;

  @Prop()
  public position: number;

  @Prop()
  public photo_url: string;
}

export type PlayerDocument = Player & Document;
export const PlayerSchema = SchemaFactory.createForClass(Player);
