import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Player } from 'src/players/entities/player.entity';
import { Result, ResultSchema } from './result.entity';

@Schema({
  timestamps: true,
  collection: 'matches',
})
export class Match {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ required: true, type: [mongoose.Types.ObjectId], ref: 'Player' })
  players: Player[];

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Player' })
  def: Player;

  @Prop({ required: true, type: [ResultSchema] })
  result: Result[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);
