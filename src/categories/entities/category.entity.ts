import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Player } from 'src/players/entities/player.entity';
import { Event } from '../domain/types/Event.type';
import { EventSchema } from './event.entity';

@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category {
  @Prop({ required: true, type: String })
  category: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: [EventSchema] })
  events: Event[];

  @Prop({ required: false, type: [mongoose.Types.ObjectId], ref: 'Player' })
  players: Player[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
