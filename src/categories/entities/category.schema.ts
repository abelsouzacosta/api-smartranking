import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Player } from 'src/players/entities/player.schema';

export type Event = {
  name: string;
  operation: string;
  value: number;
};

@Schema({
  timestamps: true,
  collection: 'categories',
  selectPopulatedPaths: true,
})
export class Category {
  @Prop({ required: true, unique: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  events: Event[];

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  })
  players: string[];
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
